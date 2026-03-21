/**
 * LiMeiHua Lightning Exchange Atomic Swap - Navigation Bar
 * 
 * ชุดซอฟต์แวร์ชุดนี้ มีไว้เพื่อเป็นโครงสร้างพื้นฐานทางการเงินยุคใหม่
 * เพื่อรองรับการไหลของเงินจำนวนมหาศาลของท่านผู้เฒ่าหลี่เหมยฮัว หรือ LiMeiHua Grand Mother
 * Source code นี้สร้างโดย Mr.Kanutsanan Pongpanna (นายคณัสนันท์ พงษ์พันนา)
 * URL: https://chatgpt.com/g/g-68d289535dec81919445deb9830f2d8e-kanutsanan-pongpanna
 */

import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { useI18n, SUPPORTED_LANGUAGES } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Zap, Globe, Menu, X, ArrowLeftRight, Droplets, BarChart3, Users, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { t, language, setLanguage } = useI18n();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('nav.home'), icon: Zap },
    { href: '/exchange', label: t('nav.exchange'), icon: ArrowLeftRight },
    { href: '/liquidity', label: t('nav.liquidity'), icon: Droplets },
    { href: '/rates', label: t('nav.rates'), icon: BarChart3 },
    { href: '/peers', label: t('nav.peers'), icon: Users },
    { href: '/docs', label: t('nav.docs'), icon: BookOpen },
  ];

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20 group-hover:shadow-gold/40 transition-shadow">
            <Zap className="w-5 h-5 text-navy-deep" />
          </div>
          <div className="hidden sm:block">
            <span className="font-serif text-lg font-semibold gold-text tracking-wide">LiMeiHua</span>
            <span className="text-xs text-muted-foreground block -mt-1 tracking-widest uppercase">Exchange</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  isActive 
                    ? 'text-gold bg-gold/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}>
                  <Icon className="w-4 h-4" />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 border-border/50 bg-transparent hover:bg-accent/50">
                <Globe className="w-4 h-4 text-gold" />
                <span className="text-xs hidden sm:inline">{currentLang?.nativeName || 'ไทย'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-card border-border/50">
              <ScrollArea className="h-80">
                {SUPPORTED_LANGUAGES.map(lang => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex justify-between cursor-pointer ${language === lang.code ? 'text-gold bg-gold/10' : ''}`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-xs text-muted-foreground">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="outline" 
            size="sm" 
            className="lg:hidden border-border/50 bg-transparent"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="container py-4 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    <span className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                      isActive 
                        ? 'text-gold bg-gold/10' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}>
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
