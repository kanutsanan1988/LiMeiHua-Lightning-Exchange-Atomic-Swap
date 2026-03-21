/**
 * LiMeiHua Lightning Exchange Atomic Swap - Documentation Page
 * 
 * ชุดซอฟต์แวร์ชุดนี้ มีไว้เพื่อเป็นโครงสร้างพื้นฐานทางการเงินยุคใหม่
 * เพื่อรองรับการไหลของเงินจำนวนมหาศาลของท่านผู้เฒ่าหลี่เหมยฮัว หรือ LiMeiHua Grand Mother
 * Source code นี้สร้างโดย Mr.Kanutsanan Pongpanna (นายคณัสนันท์ พงษ์พันนา)
 * URL: https://chatgpt.com/g/g-68d289535dec81919445deb9830f2d8e-kanutsanan-pongpanna
 */

import { useI18n } from '@/contexts/I18nContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BookOpen, Code, Zap, Shield, Globe, GitBranch, Terminal, FileCode } from 'lucide-react';

export default function Docs() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-2">{t('nav.docs')}</h1>
              <p className="text-sm text-muted-foreground">Developer Documentation & API Reference</p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-secondary/50 border border-border/30 flex-wrap h-auto gap-1 p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  <BookOpen className="w-4 h-4 mr-1.5" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="quickstart" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  <Terminal className="w-4 h-4 mr-1.5" />
                  Quick Start
                </TabsTrigger>
                <TabsTrigger value="api" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  <Code className="w-4 h-4 mr-1.5" />
                  API
                </TabsTrigger>
                <TabsTrigger value="architecture" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
                  <GitBranch className="w-4 h-4 mr-1.5" />
                  Architecture
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  <Card className="bg-card/50 border-border/30">
                    <CardHeader>
                      <CardTitle className="font-serif gold-text flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        LiMeiHua Lightning Exchange Atomic Swap
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        ศูนย์แลกเปลี่ยนสินทรัพย์ดิจิทัลแบบกระจายศูนย์ (DEX) ที่ทำงานบน Bitcoin Lightning Network 
                        ใช้เทคนิค Atomic Swap ผ่าน Hash Time-Locked Contracts (HTLC) เพื่อให้การแลกเปลี่ยน Token 
                        เป็นไปอย่างปลอดภัยและไม่ต้องพึ่งพาตัวกลาง
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {[
                          { icon: Shield, title: 'Atomic Swap', desc: 'HTLC-based trustless exchange' },
                          { icon: Zap, title: 'Lightning Fast', desc: 'Sub-second settlement' },
                          { icon: Globe, title: '210 Languages', desc: 'Global accessibility' },
                          { icon: Code, title: 'Open Source', desc: 'MIT Licensed, fork-friendly' },
                        ].map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border/20">
                              <Icon className="w-5 h-5 text-gold mt-0.5" />
                              <div>
                                <p className="font-medium text-foreground text-sm">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="quickstart">
                <Card className="bg-card/50 border-border/30">
                  <CardHeader>
                    <CardTitle className="font-serif gold-text flex items-center gap-2">
                      <Terminal className="w-5 h-5" />
                      Quick Start Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg text-gold">1. Clone Repository</h3>
                      <pre className="p-4 rounded-lg bg-navy-deep border border-border/20 overflow-x-auto">
                        <code className="text-sm font-mono text-emerald-400">
{`git clone https://github.com/kanutsanan1988/LiMeiHua-Lightning-Exchange-Atomic-Swap.git
cd LiMeiHua-Lightning-Exchange-Atomic-Swap`}
                        </code>
                      </pre>

                      <h3 className="font-serif text-lg text-gold">2. Install Dependencies</h3>
                      <pre className="p-4 rounded-lg bg-navy-deep border border-border/20 overflow-x-auto">
                        <code className="text-sm font-mono text-emerald-400">
{`pnpm install`}
                        </code>
                      </pre>

                      <h3 className="font-serif text-lg text-gold">3. Start Development Server</h3>
                      <pre className="p-4 rounded-lg bg-navy-deep border border-border/20 overflow-x-auto">
                        <code className="text-sm font-mono text-emerald-400">
{`pnpm dev`}
                        </code>
                      </pre>

                      <h3 className="font-serif text-lg text-gold">4. Build for Production</h3>
                      <pre className="p-4 rounded-lg bg-navy-deep border border-border/20 overflow-x-auto">
                        <code className="text-sm font-mono text-emerald-400">
{`pnpm build`}
                        </code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="api">
                <Card className="bg-card/50 border-border/30">
                  <CardHeader>
                    <CardTitle className="font-serif gold-text flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      API Reference
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { method: 'POST', path: '/api/swap/create', desc: 'Create a new atomic swap order' },
                      { method: 'GET', path: '/api/swap/:id', desc: 'Get swap order status' },
                      { method: 'POST', path: '/api/swap/:id/execute', desc: 'Execute the atomic swap' },
                      { method: 'GET', path: '/api/rates', desc: 'Get all exchange rates' },
                      { method: 'PUT', path: '/api/rates/:pair', desc: 'Update exchange rate for a pair' },
                      { method: 'GET', path: '/api/liquidity/pools', desc: 'Get all liquidity pools' },
                      { method: 'POST', path: '/api/liquidity/add', desc: 'Add liquidity to a pool' },
                      { method: 'POST', path: '/api/liquidity/remove', desc: 'Remove liquidity from a pool' },
                      { method: 'POST', path: '/api/liquidity/share', desc: 'Share liquidity with partner' },
                      { method: 'GET', path: '/api/peers', desc: 'Get connected peers' },
                      { method: 'POST', path: '/api/peers/connect', desc: 'Connect to a new peer' },
                      { method: 'DELETE', path: '/api/peers/:id', desc: 'Disconnect from a peer' },
                    ].map((api, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border/20">
                        <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                          api.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' :
                          api.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                          api.method === 'PUT' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {api.method}
                        </span>
                        <div>
                          <p className="font-mono text-sm text-foreground">{api.path}</p>
                          <p className="text-xs text-muted-foreground mt-1">{api.desc}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="architecture">
                <Card className="bg-card/50 border-border/30">
                  <CardHeader>
                    <CardTitle className="font-serif gold-text flex items-center gap-2">
                      <GitBranch className="w-5 h-5" />
                      System Architecture
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <pre className="p-6 rounded-lg bg-navy-deep border border-border/20 overflow-x-auto text-xs font-mono text-muted-foreground leading-relaxed">
{`┌─────────────────────────────────────────────────┐
│                  Web Interface                   │
│          (React + Tailwind + shadcn/ui)          │
│              210 Language Support                 │
├─────────────────────────────────────────────────┤
│                 Exchange Engine                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Atomic   │  │   Rate   │  │  Liquidity   │  │
│  │   Swap    │  │  Manager │  │   Manager    │  │
│  │  (HTLC)   │  │          │  │              │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
├─────────────────────────────────────────────────┤
│              Peer Network Layer                   │
│  ┌──────────────────────────────────────────┐   │
│  │    Decentralized P2P Connection          │   │
│  │    Shared Liquidity Protocol             │   │
│  │    Partner Discovery & Management        │   │
│  └──────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│           Bitcoin Lightning Network              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Payment  │  │  Channel │  │   Invoice    │  │
│  │ Channels │  │  Manager │  │   Manager    │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
├─────────────────────────────────────────────────┤
│              Bitcoin Base Layer                   │
│            (Settlement & Security)               │
└─────────────────────────────────────────────────┘`}
                    </pre>

                    <div className="space-y-4">
                      <h3 className="font-serif text-lg text-gold">Key Components</h3>
                      {[
                        { title: 'Atomic Swap Engine', desc: 'Handles HTLC creation, monitoring, and settlement for trustless cross-token exchanges' },
                        { title: 'Rate Management', desc: 'Auto and manual rate setting with spread control, oracle integration ready' },
                        { title: 'Liquidity Manager', desc: 'Pool management, LP token tracking, and voluntary liquidity sharing' },
                        { title: 'Peer Network', desc: 'Decentralized P2P connections for cross-exchange liquidity sharing' },
                        { title: 'Lightning Integration', desc: 'Payment channel management, invoice creation, and HTLC routing' },
                      ].map((comp, i) => (
                        <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/20">
                          <p className="font-medium text-gold text-sm">{comp.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{comp.desc}</p>
                        </div>
                      ))}
                    </div>
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
