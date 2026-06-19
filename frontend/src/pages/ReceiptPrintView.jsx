import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const ReceiptPrintView = () => {
    const { saleId } = useParams();
    const [sale, setSale] = useState(null);
    const [settings, setSettings] = useState({
        business: null,
        invoice: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [saleRes, bizRes, invRes] = await Promise.all([
                    api.get(`/sales/${saleId}`),
                    api.get('/settings/business'),
                    api.get('/settings/invoice')
                ]);

                if (saleRes.data.success) {
                    setSale(saleRes.data.data);
                } else {
                    setError('Sale not found');
                }

                if (bizRes.data.success) {
                    setSettings(prev => ({ ...prev, business: bizRes.data.data }));
                }
                if (invRes.data.success) {
                    setSettings(prev => ({ ...prev, invoice: invRes.data.data }));
                }

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error loading receipt data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [saleId]);

    useEffect(() => {
        if (!loading && sale && settings.business && settings.invoice) {
            // Auto-print after a short delay to ensure rendering
            setTimeout(() => {
                window.print();
            }, 800);
        }
    }, [loading, sale, settings]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans text-sm text-gray-500">Loading receipt...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans text-sm text-red-500">{error}</div>;
    if (!sale) return null;

    const { business, invoice } = settings;
    const logoUrl = invoice?.logoUrl ? `http://localhost:3000${invoice.logoUrl}` : null;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-8 print:bg-white print:p-0 print:m-0 print:h-auto print:min-h-0">
            <style>
                {`
                    @media print {
                        @page { margin: 0; size: auto; }
                        body { background: white; }
                        body * { visibility: hidden; }
                        #receipt-container, #receipt-container * { visibility: visible; }
                        #receipt-container {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            margin: 0;
                            padding: 10px; /* Slight padding for printer margins */
                            box-shadow: none;
                        }
                    }
                `}
            </style>

            {/* Receipt Container - 80mm Standard Width (approx 300-320px) */}
            <div id="receipt-container" className="w-[80mm] bg-white p-6 shadow-xl print:shadow-none print:w-full font-sans text-gray-900 leading-tight">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-6">
                    {logoUrl && (
                        <img src={logoUrl} alt="Logo" className="h-16 mb-3 object-contain px-4" />
                    )}
                    <h1 className="text-xl font-bold uppercase tracking-wide mb-1 opacity-90">{business?.pharmacyName || 'Pharmacy POS'}</h1>

                    <div className="text-[10px] text-gray-600 space-y-0.5">
                        <p>{business?.address}</p>
                        {business?.phone && <p>Tel: {business.phone}</p>}
                        {business?.email && <p>{business.email}</p>}
                        {business?.registrationNumber && <p className="mt-1 font-medium">Reg: {business.registrationNumber}</p>}
                    </div>

                    {invoice?.headerText && (
                        <div className="mt-3 pt-2 border-t border-gray-100 w-full text-[10px] font-medium italic text-gray-500">
                            {invoice.headerText}
                        </div>
                    )}
                </div>

                {/* Receipt Info */}
                <div className="flex justify-between items-end border-b-2 border-black pb-2 mb-4 text-[10px] font-mono">
                    <div className="flex flex-col">
                        <span className="text-gray-500">Receipt No</span>
                        <span className="font-bold">#{sale._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-gray-500">Date</span>
                        <span className="font-bold">{new Date(sale.createdAt).toLocaleDateString()}</span>
                        <span className="text-[9px] text-gray-400">{new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>

                {/* Customer / Cashier Info */}
                <div className="mb-4 text-[10px] flex justify-between">
                    <div>
                        <span className="text-gray-500 block">Customer</span>
                        <span className="font-medium text-gray-900 truncate max-w-[120px] block" title={sale.customer?.name}>
                            {sale.customer?.name || 'Walk-in Customer'}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-gray-500 block">Cashier</span>
                        <span className="font-medium text-gray-900">{sale.user?.name || 'Staff'}</span>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-4">
                    <table className="w-full text-[11px]">
                        <thead>
                            <tr className="border-b border-black text-left font-bold uppercase">
                                <th className="pb-1 w-[45%]">Item</th>
                                <th className="pb-1 text-center w-[15%]">Qty</th>
                                <th className="pb-1 text-right w-[20%]">Price</th>
                                <th className="pb-1 text-right w-[20%]">Total</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono text-[10px]">
                            {sale.items.map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 last:border-0 border-dashed">
                                    <td className="py-2 pr-1 align-top">
                                        <div className="font-medium text-gray-900 truncate-2-lines line-clamp-2">
                                            {item.productName || item.product?.name}
                                        </div>
                                    </td>
                                    <td className="py-2 text-center align-top">{item.quantity}</td>
                                    <td className="py-2 text-right align-top text-gray-600">{item.unitPrice.toFixed(2)}</td>
                                    <td className="py-2 text-right align-top font-medium">{item.totalPrice.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals Section */}
                <div className="space-y-1 pt-2 border-t-2 border-black border-dashed mb-6 text-[11px]">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-mono">${(sale.total - (sale.tax || 0)).toFixed(2)}</span>
                    </div>

                    {invoice?.enableTax && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">{invoice.taxName || 'Tax'} ({invoice.taxRate}%)</span>
                            <span className="font-mono">${(sale.tax || 0).toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between pt-2 mt-1 border-t border-gray-200 text-sm font-bold items-center">
                        <span className="uppercase">Total Amount</span>
                        <span className="text-lg">${sale.total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="bg-gray-50 p-2 rounded border border-gray-100 mb-6 text-[10px]">
                    <div className="flex justify-between mb-1">
                        <span className="text-gray-500 uppercase font-bold text-[9px]">Payment Method</span>
                        <span className="font-medium uppercase">{sale.paymentMethod}</span>
                    </div>
                    {sale.paymentDetails?.amountPaid && (
                        <div className="flex justify-between">
                            <span className="text-gray-500">Tendered</span>
                            <span className="font-mono">${sale.paymentDetails.amountPaid.toFixed(2)}</span>
                        </div>
                    )}
                    {sale.paymentDetails?.change > 0 && (
                        <div className="flex justify-between text-gray-600">
                            <span className="text-gray-500">Change</span>
                            <span className="font-mono">${sale.paymentDetails.change.toFixed(2)}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center">
                    {/* Barcode Simulation (Visual only) */}
                    <div className="mb-3 opacity-60">
                        <div className="h-8 bg-current mx-auto w-3/4 mb-1" style={{ clipPath: 'polygon(0% 0%, 2% 0%, 2% 100%, ...)' /* CSS Barcode? Too complex, just use a repeating gradient */, background: 'repeating-linear-gradient(to right, #000 0, #000 2px, transparent 2px, transparent 4px, #000 4px, #000 5px, transparent 5px)' }}></div>
                        <span className="text-[9px] font-mono tracking-widest">{sale._id.toUpperCase()}</span>
                    </div>

                    <div className="text-[10px] font-medium text-gray-500">
                        {invoice?.footerText ? (
                            <p>{invoice.footerText}</p>
                        ) : (
                            <>
                                <p>Thank you for shopping with us!</p>
                                <p>No returns without receipt.</p>
                            </>
                        )}
                    </div>
                    <div className="mt-4 text-[8px] text-gray-300">
                        Powered by Antigravity POS
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptPrintView;
