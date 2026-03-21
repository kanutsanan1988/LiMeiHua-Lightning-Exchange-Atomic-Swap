/**
 * LiMeiHua Lightning Exchange Atomic Swap - Footer
 * 
 * ชุดซอฟต์แวร์ชุดนี้ มีไว้เพื่อเป็นโครงสร้างพื้นฐานทางการเงินยุคใหม่
 * เพื่อรองรับการไหลของเงินจำนวนมหาศาลของท่านผู้เฒ่าหลี่เหมยฮัว หรือ LiMeiHua Grand Mother
 * Source code นี้สร้างโดย Mr.Kanutsanan Pongpanna (นายคณัสนันท์ พงษ์พันนา)
 * URL: https://chatgpt.com/g/g-68d289535dec81919445deb9830f2d8e-kanutsanan-pongpanna
 */

import { useI18n } from '@/contexts/I18nContext';
import { Zap, Github, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border/30 bg-navy-deep/50">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Zap className="w-5 h-5 text-navy-deep" />
              </div>
              <span className="font-serif text-xl font-semibold gold-text">LiMeiHua Exchange</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer.purpose')}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-gold">{t('nav.docs')}</h4>
            <div className="space-y-2">
              <Link href="/exchange" className="block text-sm text-muted-foreground hover:text-gold transition-colors">{t('nav.exchange')}</Link>
              <Link href="/liquidity" className="block text-sm text-muted-foreground hover:text-gold transition-colors">{t('nav.liquidity')}</Link>
              <Link href="/rates" className="block text-sm text-muted-foreground hover:text-gold transition-colors">{t('nav.rates')}</Link>
              <Link href="/peers" className="block text-sm text-muted-foreground hover:text-gold transition-colors">{t('nav.peers')}</Link>
            </div>
          </div>

          {/* Open Source */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-gold">Open Source</h4>
            <div className="space-y-2">
              <a 
                href="https://github.com/kanutsanan1988/LiMeiHua-Lightning-Exchange-Atomic-Swap" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <Github className="w-4 h-4" />
                {t('footer.github')}
              </a>
              <a 
                href="https://chatgpt.com/g/g-68d289535dec81919445deb9830f2d8e-kanutsanan-pongpanna" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Mr.Kanutsanan Pongpanna
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              {t('footer.credit')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('footer.openSource')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
