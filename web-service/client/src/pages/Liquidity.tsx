/**
 * LiMeiHua Lightning Exchange Atomic Swap - Liquidity Management Page
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Droplets, Plus, Minus, Share2, TrendingUp, Lock, Users } from 'lucide-react';
import { toast } from 'sonner';

const POOLS = [
  { pair: 'BTC/LMH', tvl: '₿ 125.5', apy: '12.5%', myShare: '0.05%', volume24h: '₿ 45.2' },
  { pair: 'BTC/USDT', tvl: '₿ 890.3', apy: '8.2%', myShare: '0.02%', volume24h: '₿ 234.1' },
  { pair: 'BTC/ETH', tvl: '₿ 456.7', apy: '10.1%', myShare: '0.00%', volume24h: '₿ 167.8' },
  { pair: 'LMH/USDT', tvl: '₿ 67.2', apy: '15.3%', myShare: '0.10%', volume24h: '₿ 23.4' },
  { pair: 'ETH/USDT', tvl: '₿ 345.6', apy: '9.7%', myShare: '0.00%', volume24h: '₿ 89.5' },
];

export default function Liquidity() {
  const { t } = useI18n();
  const [shareEnabled, setShareEnabled] = useState(false);

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
              <h1 className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-2">{t('liquidity.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('features.liquidityDesc')}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: t('liquidity.totalLocked'), value: '₿ 1,885.3', icon: Lock },
                { label: t('liquidity.apy'), value: '8.2% - 15.3%', icon: TrendingUp },
                { label: t('peers.sharedLiquidity'), value: '12 Partners', icon: Users },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Card key={i} className="bg-card/50 border-border/30">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="font-mono text-lg font-semibold text-foreground">{stat.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Tabs defaultValue="pools" className="space-y-6">
              <TabsList className="bg-secondary/50 border border-border/30">
                <TabsTrigger value="pools" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  <Droplets className="w-4 h-4 mr-1.5" />
                  {t('liquidity.pool')}
                </TabsTrigger>
                <TabsTrigger value="add" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  <Plus className="w-4 h-4 mr-1.5" />
                  {t('liquidity.add')}
                </TabsTrigger>
                <TabsTrigger value="share" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  <Share2 className="w-4 h-4 mr-1.5" />
                  {t('liquidity.share')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pools">
                <div className="space-y-3">
                  {POOLS.map((pool, i) => (
                    <motion.div
                      key={pool.pair}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="bg-card/50 border-border/30 hover:border-gold/20 transition-colors">
                        <CardContent className="p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                <Droplets className="w-5 h-5 text-gold" />
                              </div>
                              <div>
                                <p className="font-mono font-semibold text-foreground">{pool.pair}</p>
                                <p className="text-xs text-muted-foreground">Vol 24h: {pool.volume24h}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-6 text-sm">
                              <div>
                                <p className="text-xs text-muted-foreground">TVL</p>
                                <p className="font-mono text-foreground">{pool.tvl}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">APY</p>
                                <p className="font-mono text-emerald-400">{pool.apy}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">{t('liquidity.myPosition')}</p>
                                <p className="font-mono text-gold">{pool.myShare}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-gold/10 text-gold hover:bg-gold/20 border border-gold/20">
                                <Plus className="w-3 h-3 mr-1" />
                                {t('liquidity.add')}
                              </Button>
                              <Button size="sm" variant="outline" className="border-border/30">
                                <Minus className="w-3 h-3 mr-1" />
                                {t('liquidity.remove')}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="add">
                <Card className="bg-card/50 border-border/30 max-w-lg mx-auto">
                  <CardHeader>
                    <CardTitle className="font-serif gold-text">{t('liquidity.add')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Token A</Label>
                      <Input placeholder="0.00 BTC" className="bg-secondary/50 border-border/30 font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label>Token B</Label>
                      <Input placeholder="0.00 LMH" className="bg-secondary/50 border-border/30 font-mono" />
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/30 text-sm text-muted-foreground">
                      <p>Pool Share: ~0.05%</p>
                      <p>Estimated APY: 12.5%</p>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold"
                      onClick={() => toast.success(t('common.comingSoon'))}
                    >
                      {t('liquidity.add')}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="share">
                <Card className="bg-card/50 border-border/30 max-w-lg mx-auto">
                  <CardHeader>
                    <CardTitle className="font-serif gold-text">{t('liquidity.share')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/20">
                      <div>
                        <p className="font-medium text-foreground">{t('peers.decentralized')}</p>
                        <p className="text-xs text-muted-foreground mt-1">Share liquidity with partner exchanges</p>
                      </div>
                      <Switch checked={shareEnabled} onCheckedChange={setShareEnabled} />
                    </div>
                    {shareEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label>Share Percentage</Label>
                          <Input type="number" placeholder="25" className="bg-secondary/50 border-border/30 font-mono" />
                          <p className="text-xs text-muted-foreground">% of your liquidity to share with partners</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Partner Node URI</Label>
                          <Input placeholder="node_pubkey@host:port" className="bg-secondary/50 border-border/30 font-mono text-xs" />
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold"
                          onClick={() => toast.success(t('common.comingSoon'))}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          {t('liquidity.share')}
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
