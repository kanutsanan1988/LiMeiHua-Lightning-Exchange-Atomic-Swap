/**
 * LiMeiHua Lightning Exchange Atomic Swap - Peer Network Page
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
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Users, Plus, Wifi, WifiOff, Globe, Droplets, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';

const PEERS = [
  { id: '1', name: 'Bangkok DEX Node', uri: '03a1b2c3...@bangkok.dex:9735', status: 'online', liquidity: '₿ 45.2', channels: 8, uptime: '99.9%' },
  { id: '2', name: 'Singapore Exchange', uri: '02d4e5f6...@sg.exchange:9735', status: 'online', liquidity: '₿ 120.5', channels: 15, uptime: '99.7%' },
  { id: '3', name: 'Tokyo Lightning Hub', uri: '04g7h8i9...@tokyo.hub:9735', status: 'online', liquidity: '₿ 89.3', channels: 12, uptime: '99.8%' },
  { id: '4', name: 'Seoul Swap Node', uri: '05j0k1l2...@seoul.swap:9735', status: 'offline', liquidity: '₿ 34.1', channels: 5, uptime: '95.2%' },
  { id: '5', name: 'Mumbai Exchange', uri: '06m3n4o5...@mumbai.ex:9735', status: 'online', liquidity: '₿ 67.8', channels: 9, uptime: '98.5%' },
  { id: '6', name: 'Dubai Lightning', uri: '07p6q7r8...@dubai.ln:9735', status: 'online', liquidity: '₿ 156.2', channels: 20, uptime: '99.5%' },
];

export default function Peers() {
  const { t } = useI18n();
  const [peerUri, setPeerUri] = useState('');

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
              <h1 className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-2">{t('peers.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('peers.decentralized')}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Peers', value: '6', icon: Users },
                { label: t('peers.online'), value: '5', icon: Wifi },
                { label: 'Total Channels', value: '69', icon: Zap },
                { label: t('peers.sharedLiquidity'), value: '₿ 513.1', icon: Droplets },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Card key={i} className="bg-card/50 border-border/30">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-gold" />
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

            {/* Add Peer */}
            <Card className="bg-card/50 border-border/30 mb-8">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input 
                      placeholder="node_pubkey@host:port" 
                      value={peerUri}
                      onChange={e => setPeerUri(e.target.value)}
                      className="bg-secondary/50 border-border/30 font-mono text-sm"
                    />
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold"
                    onClick={() => {
                      if (!peerUri) { toast.error(t('common.error')); return; }
                      toast.success(t('common.comingSoon'));
                      setPeerUri('');
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t('peers.addPeer')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Peer List */}
            <div className="space-y-3">
              {PEERS.map((peer, i) => (
                <motion.div
                  key={peer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="bg-card/50 border-border/30 hover:border-gold/20 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            peer.status === 'online' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                          }`}>
                            {peer.status === 'online' ? (
                              <Wifi className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <WifiOff className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground">{peer.name}</p>
                              <Badge variant="outline" className={`text-xs ${
                                peer.status === 'online' ? 'border-emerald-400/30 text-emerald-400' : 'border-red-400/30 text-red-400'
                              }`}>
                                {peer.status === 'online' ? t('peers.online') : t('peers.offline')}
                              </Badge>
                            </div>
                            <p className="text-xs font-mono text-muted-foreground mt-0.5">{peer.uri}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">{t('peers.sharedLiquidity')}</p>
                            <p className="font-mono text-gold">{peer.liquidity}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Channels</p>
                            <p className="font-mono text-foreground">{peer.channels}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Uptime</p>
                            <p className="font-mono text-emerald-400">{peer.uptime}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={peer.status === 'online' ? 'border-red-400/30 text-red-400 hover:bg-red-400/10' : 'border-gold/30 text-gold hover:bg-gold/10'}
                          onClick={() => toast.success(t('common.comingSoon'))}
                        >
                          {peer.status === 'online' ? t('peers.disconnect') : t('peers.connect')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
