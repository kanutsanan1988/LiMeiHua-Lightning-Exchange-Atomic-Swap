/**
 * LiMeiHua Lightning Exchange Atomic Swap - Home Page
 * 
 * ชุดซอฟต์แวร์ชุดนี้ มีไว้เพื่อเป็นโครงสร้างพื้นฐานทางการเงินยุคใหม่
 * เพื่อรองรับการไหลของเงินจำนวนมหาศาลของท่านผู้เฒ่าหลี่เหมยฮัว หรือ LiMeiHua Grand Mother
 * Source code นี้สร้างโดย Mr.Kanutsanan Pongpanna (นายคณัสนันท์ พงษ์พันนา)
 * URL: https://chatgpt.com/g/g-68d289535dec81919445deb9830f2d8e-kanutsanan-pongpanna
 */

import { useI18n } from '@/contexts/I18nContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Zap, ArrowLeftRight, Droplets, Shield, Globe, Code, BarChart3, Users } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const { t } = useI18n();

  const features = [
    { icon: ArrowLeftRight, title: t('features.atomicSwap'), desc: t('features.atomicSwapDesc'), color: 'from-gold/20 to-gold-dark/10' },
    { icon: Zap, title: t('features.lightning'), desc: t('features.lightningDesc'), color: 'from-blue-500/20 to-blue-700/10' },
    { icon: Droplets, title: t('features.liquidity'), desc: t('features.liquidityDesc'), color: 'from-emerald-500/20 to-emerald-700/10' },
    { icon: Shield, title: t('features.decentralized'), desc: t('features.decentralizedDesc'), color: 'from-purple-500/20 to-purple-700/10' },
    { icon: BarChart3, title: t('features.rateManagement'), desc: t('features.rateManagementDesc'), color: 'from-amber-500/20 to-amber-700/10' },
    { icon: Code, title: t('features.openSource'), desc: t('features.openSourceDesc'), color: 'from-cyan-500/20 to-cyan-700/10' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663413805804/7iD2Dsfdq9NvyqFqeKHVMn/hero-bg-GJDTaBdem6eMccELznRgok.webp" 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="container relative z-10 py-24 lg:py-40">
          <motion.div 
            className="max-w-3xl"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium">
                <Zap className="w-3.5 h-3.5" />
                Bitcoin Lightning Network
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="gold-text">{t('hero.title')}</span>
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/exchange">
                <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold hover:opacity-90 shadow-lg shadow-gold/20 px-8">
                  <ArrowLeftRight className="w-4 h-4 mr-2" />
                  {t('hero.cta')}
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 px-8">
                  {t('hero.docs')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Gold line divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </section>

      {/* Features */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-4">
              Atomic Swap DEX
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('app.description')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={i} variants={fadeUp}>
                  <Card className="bg-card/50 border-border/30 hover:border-gold/30 transition-all duration-300 group h-full">
                    <CardContent className="p-8">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Atomic Swap Visual */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/20 to-background" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-6">
                {t('features.atomicSwap')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('features.atomicSwapDesc')}
              </p>
              <div className="space-y-4">
                {[
                  'Hash Time-Locked Contracts (HTLC)',
                  'Cross-chain Token Exchange',
                  'Zero Counterparty Risk',
                  'Instant Settlement via Lightning',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663413805804/7iD2Dsfdq9NvyqFqeKHVMn/atomic-swap-hHwKbSgoXCcknhVcTsUoHS.webp" 
                alt="Atomic Swap" 
                className="w-full max-w-md rounded-2xl shadow-2xl shadow-gold/10 border border-border/20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Liquidity Sharing */}
      <section className="py-24 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center order-2 lg:order-1"
            >
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663413805804/7iD2Dsfdq9NvyqFqeKHVMn/liquidity-sharing-dxFF3LwrNgpyWFEJSns3Jy.webp" 
                alt="Liquidity Sharing" 
                className="w-full max-w-md rounded-2xl shadow-2xl shadow-gold/10 border border-border/20"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-6">
                {t('features.liquidity')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('features.liquidityDesc')}
              </p>
              <div className="space-y-4">
                {[
                  'Decentralized Peer-to-Peer Sharing',
                  'Voluntary Liquidity Pools',
                  'Cross-Exchange Partner Network',
                  'Real-time Liquidity Monitoring',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Peace Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663413805804/7iD2Dsfdq9NvyqFqeKHVMn/peace-finance-Xj5qMqx99SYbsut72Fxzjm.webp" 
            alt="" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-6">
              {t('peace.title')}
            </h2>
            <p className="text-xl text-gold/80 font-serif italic mb-6">
              {t('peace.subtitle')}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t('peace.description')}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8" />
            <p className="text-sm text-muted-foreground">
              Hard Money · Bitcoin · Lightning Network
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lightning Network Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-6">
                {t('features.lightning')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('features.lightningDesc')}
              </p>
              <Link href="/exchange">
                <Button className="bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold hover:opacity-90">
                  <Zap className="w-4 h-4 mr-2" />
                  {t('hero.cta')}
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663413805804/7iD2Dsfdq9NvyqFqeKHVMn/lightning-network-ifFJhAB5Y2qPWia6QAD6Tj.webp" 
                alt="Lightning Network" 
                className="w-full max-w-md rounded-2xl shadow-2xl shadow-gold/10 border border-border/20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <Card className="bg-gradient-to-br from-navy-light/50 to-navy-deep/50 border-gold/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <CardContent className="p-12 lg:p-16 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-text mb-4">
                Open Source
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                {t('features.openSourceDesc')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://github.com/kanutsanan1988/LiMeiHua-Lightning-Exchange-Atomic-Swap" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold hover:opacity-90 px-8">
                    <Code className="w-4 h-4 mr-2" />
                    GitHub Repository
                  </Button>
                </a>
                <Link href="/docs">
                  <Button size="lg" variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 px-8">
                    {t('hero.docs')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
