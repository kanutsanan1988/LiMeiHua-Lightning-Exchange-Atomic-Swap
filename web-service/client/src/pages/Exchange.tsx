/**
 * LiMeiHua Lightning Exchange Atomic Swap - Exchange Page
 * 
 * ชุดซอฟต์แวร์ชุดนี้ มีไว้เพื่อเป็นโครงสร้างพื้นฐานทางการเงินยุคใหม่
 * เพื่อรองรับการไหลของเงินจำนวนมหาศาลของท่านผู้เฒ่าหลี่เหมยฮัว หรือ LiMeiHua Grand Mother
 * Source code นี้สร้างโดย Mr.Kanutsanan Pongpanna (นายคณัสนันท์ พงษ์พันนา)
 * URL: https://chatgpt.com/g/g-68d289535dec81919445deb9830f2d8e-kanutsanan-pongpanna
 */

import { useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { ArrowDownUp, Zap, Shield, Clock, Info } from 'lucide-react';
import { toast } from 'sonner';

const TOKENS = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
  { symbol: 'LMH', name: 'LiMeiHua Token', icon: '梅' },
  { symbol: 'USDT', name: 'Tether', icon: '$' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ' },
  { symbol: 'LTC', name: 'Litecoin', icon: 'Ł' },
  { symbol: 'DOGE', name: 'Dogecoin', icon: 'Ð' },
];

const MOCK_RATES: Record<string, number> = {
  'BTC-LMH': 2500000,
  'BTC-USDT': 67500,
  'BTC-ETH': 18.5,
  'BTC-LTC': 850,
  'BTC-DOGE': 450000,
  'LMH-USDT': 0.027,
  'ETH-USDT': 3650,
};

export default function Exchange() {
  const { t } = useI18n();
  const [fromToken, setFromToken] = useState('BTC');
  const [toToken, setToToken] = useState('LMH');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState([0.5]);

  const getRate = () => {
    const key = `${fromToken}-${toToken}`;
    const reverseKey = `${toToken}-${fromToken}`;
    if (MOCK_RATES[key]) return MOCK_RATES[key];
    if (MOCK_RATES[reverseKey]) return 1 / MOCK_RATES[reverseKey];
    return 1;
  };

  const toAmount = fromAmount ? (parseFloat(fromAmount) * getRate()).toFixed(6) : '';
  const fee = fromAmount ? (parseFloat(fromAmount) * 0.001).toFixed(8) : '0';

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
  };

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error(t('common.error'));
      return;
    }
    toast.success(t('exchange.success'), {
      description: `${fromAmount} ${fromToken} → ${toAmount} ${toToken}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl font-bold gold-text mb-2">{t('exchange.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('app.description')}</p>
            </div>

            <Card className="bg-card/80 border-border/30 backdrop-blur-sm gold-glow">
              <CardContent className="p-6 space-y-6">
                {/* From */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">{t('exchange.from')}</Label>
                  <div className="flex gap-3">
                    <Select value={fromToken} onValueChange={setFromToken}>
                      <SelectTrigger className="w-36 bg-secondary/50 border-border/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TOKENS.filter(tk => tk.symbol !== toToken).map(tk => (
                          <SelectItem key={tk.symbol} value={tk.symbol}>
                            <span className="flex items-center gap-2">
                              <span className="text-gold font-mono">{tk.icon}</span>
                              {tk.symbol}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      type="number"
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={e => setFromAmount(e.target.value)}
                      className="bg-secondary/50 border-border/30 text-right font-mono text-lg"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-gold/30 hover:bg-gold/10 hover:border-gold/50 transition-all"
                    onClick={handleSwapTokens}
                  >
                    <ArrowDownUp className="w-4 h-4 text-gold" />
                  </Button>
                </div>

                {/* To */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">{t('exchange.to')}</Label>
                  <div className="flex gap-3">
                    <Select value={toToken} onValueChange={setToToken}>
                      <SelectTrigger className="w-36 bg-secondary/50 border-border/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TOKENS.filter(tk => tk.symbol !== fromToken).map(tk => (
                          <SelectItem key={tk.symbol} value={tk.symbol}>
                            <span className="flex items-center gap-2">
                              <span className="text-gold font-mono">{tk.icon}</span>
                              {tk.symbol}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      type="text"
                      placeholder="0.00"
                      value={toAmount}
                      readOnly
                      className="bg-secondary/30 border-border/30 text-right font-mono text-lg text-gold"
                    />
                  </div>
                </div>

                {/* Rate Info */}
                <div className="space-y-3 p-4 rounded-xl bg-secondary/30 border border-border/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('exchange.rate')}</span>
                    <span className="font-mono text-foreground">1 {fromToken} = {getRate().toLocaleString()} {toToken}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('exchange.fee')} (0.1%)</span>
                    <span className="font-mono text-foreground">{fee} {fromToken}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('exchange.slippage')}</span>
                    <span className="font-mono text-gold">{slippage[0]}%</span>
                  </div>
                  <Slider
                    value={slippage}
                    onValueChange={setSlippage}
                    min={0.1}
                    max={5}
                    step={0.1}
                    className="mt-2"
                  />
                </div>

                {/* Security Info */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gold/5 border border-gold/10">
                  <Shield className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <p className="text-gold font-medium mb-1">Atomic Swap (HTLC)</p>
                    <p>Secured by Hash Time-Locked Contracts on Lightning Network. Your funds are safe.</p>
                  </div>
                </div>

                {/* Swap Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold text-lg py-6 hover:opacity-90 shadow-lg shadow-gold/20"
                  onClick={handleSwap}
                  disabled={!fromAmount || parseFloat(fromAmount) <= 0}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {t('exchange.swap')}
                </Button>

                <div className="flex justify-center gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~2s Settlement</span>
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Non-custodial</span>
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Lightning Fast</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
