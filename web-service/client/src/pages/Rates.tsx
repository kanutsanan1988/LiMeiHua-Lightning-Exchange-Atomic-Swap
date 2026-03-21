/**
 * LiMeiHua Lightning Exchange Atomic Swap - Exchange Rates Management Page
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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Settings, RefreshCw, Edit3 } from 'lucide-react';
import { toast } from 'sonner';

const RATE_DATA = [
  { pair: 'BTC/LMH', price: '2,500,000', change: '+5.2%', up: true, volume: '₿ 45.2', spread: '0.15%', mode: 'auto' },
  { pair: 'BTC/USDT', price: '67,500', change: '+2.1%', up: true, volume: '₿ 234.1', spread: '0.05%', mode: 'auto' },
  { pair: 'BTC/ETH', price: '18.50', change: '-0.8%', up: false, volume: '₿ 167.8', spread: '0.10%', mode: 'auto' },
  { pair: 'LMH/USDT', price: '0.027', change: '+8.5%', up: true, volume: '₿ 23.4', spread: '0.20%', mode: 'manual' },
  { pair: 'ETH/USDT', price: '3,650', change: '+1.5%', up: true, volume: '₿ 89.5', spread: '0.08%', mode: 'auto' },
  { pair: 'BTC/LTC', price: '850', change: '-1.2%', up: false, volume: '₿ 34.7', spread: '0.12%', mode: 'auto' },
  { pair: 'BTC/DOGE', price: '450,000', change: '+3.7%', up: true, volume: '₿ 12.3', spread: '0.25%', mode: 'manual' },
];

export default function Rates() {
  const { t } = useI18n();
  const [editingPair, setEditingPair] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-2">{t('rates.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('features.rateManagementDesc')}</p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-secondary/50 border border-border/30">
                <TabsTrigger value="overview" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  <BarChart3 className="w-4 h-4 mr-1.5" />
                  {t('rates.title')}
                </TabsTrigger>
                <TabsTrigger value="manage" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  <Settings className="w-4 h-4 mr-1.5" />
                  {t('rates.manage')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="hidden sm:grid grid-cols-6 gap-4 px-5 py-2 text-xs text-muted-foreground uppercase tracking-wider">
                    <span>{t('rates.pair')}</span>
                    <span className="text-right">{t('rates.price')}</span>
                    <span className="text-right">{t('rates.change24h')}</span>
                    <span className="text-right">{t('rates.volume')}</span>
                    <span className="text-right">{t('rates.spread')}</span>
                    <span className="text-right">Mode</span>
                  </div>

                  {RATE_DATA.map((rate, i) => (
                    <motion.div
                      key={rate.pair}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="bg-card/50 border-border/30 hover:border-gold/20 transition-colors">
                        <CardContent className="p-5">
                          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                                <BarChart3 className="w-4 h-4 text-gold" />
                              </div>
                              <span className="font-mono font-semibold text-foreground">{rate.pair}</span>
                            </div>
                            <span className="font-mono text-right text-foreground">{rate.price}</span>
                            <span className={`font-mono text-right flex items-center justify-end gap-1 ${rate.up ? 'text-emerald-400' : 'text-red-400'}`}>
                              {rate.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {rate.change}
                            </span>
                            <span className="font-mono text-right text-muted-foreground hidden sm:block">{rate.volume}</span>
                            <span className="font-mono text-right text-muted-foreground hidden sm:block">{rate.spread}</span>
                            <div className="text-right hidden sm:block">
                              <Badge variant={rate.mode === 'auto' ? 'default' : 'outline'} className={rate.mode === 'auto' ? 'bg-gold/10 text-gold border-gold/20' : 'border-border/30'}>
                                {rate.mode === 'auto' ? t('rates.autoRate') : t('rates.manualRate')}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="manage">
                <div className="space-y-4">
                  {RATE_DATA.map((rate, i) => (
                    <Card key={rate.pair} className="bg-card/50 border-border/30">
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <span className="font-mono font-semibold text-foreground w-24">{rate.pair}</span>
                            <div className="flex items-center gap-2">
                              <Label className="text-xs text-muted-foreground">{t('rates.autoRate')}</Label>
                              <Switch defaultChecked={rate.mode === 'auto'} />
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs text-muted-foreground">{t('rates.spread')}</Label>
                              <Input 
                                defaultValue={rate.spread.replace('%', '')} 
                                className="w-24 bg-secondary/50 border-border/30 font-mono text-sm h-8" 
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs text-muted-foreground">{t('rates.manualRate')}</Label>
                              <Input 
                                defaultValue={rate.price} 
                                className="w-32 bg-secondary/50 border-border/30 font-mono text-sm h-8" 
                                disabled={rate.mode === 'auto'}
                              />
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-gold/10 text-gold hover:bg-gold/20 border border-gold/20 mt-5"
                              onClick={() => toast.success(t('common.comingSoon'))}
                            >
                              <RefreshCw className="w-3 h-3 mr-1" />
                              {t('common.save')}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
