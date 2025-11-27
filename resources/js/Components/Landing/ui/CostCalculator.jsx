import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function CostCalculator({ className = '' }) {
    const [monthlySales, setMonthlySales] = useState(500000); // ₹5L default
    
    // Calculate costs
    const shopifyMonthlyBase = 2499;
    const shopifyTransactionFee = 0.02; // 2%
    const shopifyAppsCost = 5000; // Monthly apps cost
    const years = 3;
    
    const monthlyShopifyCost = shopifyMonthlyBase + (monthlySales * shopifyTransactionFee) + shopifyAppsCost;
    const threeYearShopifyCost = monthlyShopifyCost * 12 * years;
    
    const platformFeePercent = (shopifyMonthlyBase / monthlyShopifyCost) * 100;
    const transactionFeePercent = ((monthlySales * shopifyTransactionFee) / monthlyShopifyCost) * 100;
    const appsCostPercent = (shopifyAppsCost / monthlyShopifyCost) * 100;

    const formatCurrency = (value) => {
        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(1)}L`;
        }
        return `₹${value.toLocaleString('en-IN')}`;
    };

    return (
        <div className={`bg-dark-lighter rounded-2xl p-8 border border-white/10 ${className}`}>
            <h3 className="text-2xl font-bold text-white mb-6">
                💸 The Hidden Shopify Tax
            </h3>
            
            {/* Slider */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Your Monthly Sales</span>
                    <span className="text-primary font-bold text-lg">
                        {formatCurrency(monthlySales)}
                    </span>
                </div>
                <input
                    type="range"
                    min={100000}
                    max={5000000}
                    step={50000}
                    value={monthlySales}
                    onChange={(e) => setMonthlySales(Number(e.target.value))}
                    className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹1L</span>
                    <span>₹50L</span>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-4 mb-8">
                <CostBar 
                    label="Platform Fee" 
                    amount={shopifyMonthlyBase * 12 * years}
                    percent={platformFeePercent}
                    color="bg-red-500"
                />
                <CostBar 
                    label="Transaction Fees (2%)" 
                    amount={monthlySales * shopifyTransactionFee * 12 * years}
                    percent={transactionFeePercent}
                    color="bg-orange-500"
                />
                <CostBar 
                    label="Essential Apps" 
                    amount={shopifyAppsCost * 12 * years}
                    percent={appsCostPercent}
                    color="bg-yellow-500"
                />
            </div>

            {/* Total */}
            <motion.div 
                className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 text-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <p className="text-gray-400 text-sm mb-1">3-Year Shopify Cost</p>
                <p className="text-4xl font-bold text-red-400">
                    <AnimatedCounter value={threeYearShopifyCost} prefix="₹" />
                </p>
                <p className="text-red-300/80 text-sm mt-2">
                    And you still won't own it! 😱
                </p>
            </motion.div>
        </div>
    );
}

function CostBar({ label, amount, percent, color }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-medium">
                    ₹{Math.round(amount).toLocaleString('en-IN')}
                </span>
            </div>
            <div className="h-3 bg-dark rounded-full overflow-hidden">
                <motion.div
                    className={`h-full ${color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </div>
        </div>
    );
}
