/**
 * LiMeiHua Lightning Exchange Atomic Swap - Internationalization Context
 * 
 * ชุดซอฟต์แวร์ชุดนี้ มีไว้เพื่อเป็นโครงสร้างพื้นฐานทางการเงินยุคใหม่
 * เพื่อรองรับการไหลของเงินจำนวนมหาศาลของท่านผู้เฒ่าหลี่เหมยฮัว หรือ LiMeiHua Grand Mother
 * Source code นี้สร้างโดย Mr.Kanutsanan Pongpanna (นายคณัสนันท์ พงษ์พันนา)
 * URL: https://chatgpt.com/g/g-68d289535dec81919445deb9830f2d8e-kanutsanan-pongpanna
 */

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

// Core translations for the UI - Thai as primary language
// Developers can extend this with their own translations
export interface Translations {
  [key: string]: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir?: 'ltr' | 'rtl';
}

// 210 languages list
export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino' },
  { code: 'my', name: 'Myanmar (Burmese)', nativeName: 'မြန်မာ' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ' },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', dir: 'rtl' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti' },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge' },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg' },
  { code: 'gd', name: 'Scottish Gaelic', nativeName: 'Gàidhlig' },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català' },
  { code: 'gl', name: 'Galician', nativeName: 'Galego' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa' },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho' },
  { code: 'tn', name: 'Tswana', nativeName: 'Setswana' },
  { code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga' },
  { code: 'ss', name: 'Swati', nativeName: 'SiSwati' },
  { code: 've', name: 'Venda', nativeName: 'Tshivenḓa' },
  { code: 'nr', name: 'South Ndebele', nativeName: 'isiNdebele' },
  { code: 'nso', name: 'Northern Sotho', nativeName: 'Sesotho sa Leboa' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ' },
  { code: 'om', name: 'Oromo', nativeName: 'Oromoo' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Kinyarwanda' },
  { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy' },
  { code: 'ny', name: 'Chichewa', nativeName: 'Chichewa' },
  { code: 'sn', name: 'Shona', nativeName: 'chiShona' },
  { code: 'lg', name: 'Luganda', nativeName: 'Luganda' },
  { code: 'ln', name: 'Lingala', nativeName: 'Lingála' },
  { code: 'kg', name: 'Kongo', nativeName: 'Kikongo' },
  { code: 'wo', name: 'Wolof', nativeName: 'Wolof' },
  { code: 'ff', name: 'Fula', nativeName: 'Fulfulde' },
  { code: 'bm', name: 'Bambara', nativeName: 'Bamanankan' },
  { code: 'ak', name: 'Akan', nativeName: 'Akan' },
  { code: 'ee', name: 'Ewe', nativeName: 'Eʋegbe' },
  { code: 'tw', name: 'Twi', nativeName: 'Twi' },
  { code: 'ki', name: 'Kikuyu', nativeName: 'Gĩkũyũ' },
  { code: 'rn', name: 'Kirundi', nativeName: 'Ikirundi' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული' },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ' },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek' },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргыз' },
  { code: 'tk', name: 'Turkmen', nativeName: 'Türkmen' },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ' },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', dir: 'rtl' },
  { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', dir: 'rtl' },
  { code: 'ug', name: 'Uyghur', nativeName: 'ئۇيغۇرچە', dir: 'rtl' },
  { code: 'bo', name: 'Tibetan', nativeName: 'བོད་སྐད' },
  { code: 'dz', name: 'Dzongkha', nativeName: 'རྫོང་ཁ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'ceb', name: 'Cebuano', nativeName: 'Cebuano' },
  { code: 'ilo', name: 'Ilocano', nativeName: 'Ilokano' },
  { code: 'hil', name: 'Hiligaynon', nativeName: 'Hiligaynon' },
  { code: 'war', name: 'Waray', nativeName: 'Winaray' },
  { code: 'pam', name: 'Kapampangan', nativeName: 'Kapampangan' },
  { code: 'jv', name: 'Javanese', nativeName: 'Basa Jawa' },
  { code: 'su', name: 'Sundanese', nativeName: 'Basa Sunda' },
  { code: 'min', name: 'Minangkabau', nativeName: 'Baso Minangkabau' },
  { code: 'ace', name: 'Acehnese', nativeName: 'Bahsa Acèh' },
  { code: 'ban', name: 'Balinese', nativeName: 'Basa Bali' },
  { code: 'tet', name: 'Tetum', nativeName: 'Tetun' },
  { code: 'haw', name: 'Hawaiian', nativeName: 'ʻŌlelo Hawaiʻi' },
  { code: 'sm', name: 'Samoan', nativeName: 'Gagana Samoa' },
  { code: 'to', name: 'Tongan', nativeName: 'Lea Faka-Tonga' },
  { code: 'fj', name: 'Fijian', nativeName: 'Vosa Vakaviti' },
  { code: 'mi', name: 'Maori', nativeName: 'Te Reo Māori' },
  { code: 'ty', name: 'Tahitian', nativeName: 'Reo Tahiti' },
  { code: 'bi', name: 'Bislama', nativeName: 'Bislama' },
  { code: 'tpi', name: 'Tok Pisin', nativeName: 'Tok Pisin' },
  { code: 'ht', name: 'Haitian Creole', nativeName: 'Kreyòl Ayisyen' },
  { code: 'pap', name: 'Papiamento', nativeName: 'Papiamentu' },
  { code: 'srn', name: 'Sranan Tongo', nativeName: 'Sranantongo' },
  { code: 'gcr', name: 'French Guianese Creole', nativeName: 'Créole guyanais' },
  { code: 'gn', name: 'Guarani', nativeName: "Avañe'ẽ" },
  { code: 'qu', name: 'Quechua', nativeName: 'Runasimi' },
  { code: 'ay', name: 'Aymara', nativeName: 'Aymar aru' },
  { code: 'nah', name: 'Nahuatl', nativeName: 'Nāhuatl' },
  { code: 'yua', name: 'Yucatec Maya', nativeName: "Maaya t'aan" },
  { code: 'eo', name: 'Esperanto', nativeName: 'Esperanto' },
  { code: 'ia', name: 'Interlingua', nativeName: 'Interlingua' },
  { code: 'vo', name: 'Volapük', nativeName: 'Volapük' },
  { code: 'la', name: 'Latin', nativeName: 'Latina' },
  { code: 'co', name: 'Corsican', nativeName: 'Corsu' },
  { code: 'sc', name: 'Sardinian', nativeName: 'Sardu' },
  { code: 'oc', name: 'Occitan', nativeName: 'Occitan' },
  { code: 'br', name: 'Breton', nativeName: 'Brezhoneg' },
  { code: 'lb', name: 'Luxembourgish', nativeName: 'Lëtzebuergesch' },
  { code: 'fy', name: 'Frisian', nativeName: 'Frysk' },
  { code: 'fo', name: 'Faroese', nativeName: 'Føroyskt' },
  { code: 'rm', name: 'Romansh', nativeName: 'Rumantsch' },
  { code: 'gsw', name: 'Swiss German', nativeName: 'Schwyzerdütsch' },
  { code: 'bar', name: 'Bavarian', nativeName: 'Boarisch' },
  { code: 'nds', name: 'Low German', nativeName: 'Plattdüütsch' },
  { code: 'li', name: 'Limburgish', nativeName: 'Limburgs' },
  { code: 'wa', name: 'Walloon', nativeName: 'Walon' },
  { code: 'an', name: 'Aragonese', nativeName: 'Aragonés' },
  { code: 'ast', name: 'Asturian', nativeName: 'Asturianu' },
  { code: 'ext', name: 'Extremaduran', nativeName: 'Estremeñu' },
  { code: 'mwl', name: 'Mirandese', nativeName: 'Mirandés' },
  { code: 'fur', name: 'Friulian', nativeName: 'Furlan' },
  { code: 'lij', name: 'Ligurian', nativeName: 'Ligure' },
  { code: 'pms', name: 'Piedmontese', nativeName: 'Piemontèis' },
  { code: 'vec', name: 'Venetian', nativeName: 'Vèneto' },
  { code: 'nap', name: 'Neapolitan', nativeName: 'Napulitano' },
  { code: 'scn', name: 'Sicilian', nativeName: 'Sicilianu' },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская' },
  { code: 'tt', name: 'Tatar', nativeName: 'Татар' },
  { code: 'ba', name: 'Bashkir', nativeName: 'Башҡорт' },
  { code: 'cv', name: 'Chuvash', nativeName: 'Чӑваш' },
  { code: 'ce', name: 'Chechen', nativeName: 'Нохчийн' },
  { code: 'os', name: 'Ossetian', nativeName: 'Ирон' },
  { code: 'ab', name: 'Abkhaz', nativeName: 'Аԥсуа' },
  { code: 'av', name: 'Avar', nativeName: 'Авар' },
  { code: 'kv', name: 'Komi', nativeName: 'Коми' },
  { code: 'udm', name: 'Udmurt', nativeName: 'Удмурт' },
  { code: 'mhr', name: 'Meadow Mari', nativeName: 'Олык марий' },
  { code: 'mrj', name: 'Hill Mari', nativeName: 'Кырык мары' },
  { code: 'myv', name: 'Erzya', nativeName: 'Эрзянь' },
  { code: 'mdf', name: 'Moksha', nativeName: 'Мокшень' },
  { code: 'sah', name: 'Yakut', nativeName: 'Саха' },
  { code: 'tyv', name: 'Tuvan', nativeName: 'Тыва' },
  { code: 'alt', name: 'Southern Altai', nativeName: 'Алтай' },
  { code: 'kjh', name: 'Khakas', nativeName: 'Хакас' },
  { code: 'bua', name: 'Buryat', nativeName: 'Буряад' },
  { code: 'xal', name: 'Kalmyk', nativeName: 'Хальмг' },
  { code: 'dv', name: 'Dhivehi', nativeName: 'ދިވެހި', dir: 'rtl' },
  { code: 'cr', name: 'Cree', nativeName: 'ᓀᐦᐃᔭᐍᐏᐣ' },
  { code: 'oj', name: 'Ojibwe', nativeName: 'ᐊᓂᔑᓈᐯᒧᐎᓐ' },
  { code: 'iu', name: 'Inuktitut', nativeName: 'ᐃᓄᒃᑎᑐᑦ' },
  { code: 'chr', name: 'Cherokee', nativeName: 'ᏣᎳᎩ' },
  { code: 'nv', name: 'Navajo', nativeName: 'Diné bizaad' },
  { code: 'chy', name: 'Cheyenne', nativeName: 'Tsėhésenėstsestȯtse' },
  { code: 'mus', name: 'Muscogee', nativeName: 'Mvskoke' },
];

// Core UI translations - Thai as primary
const coreTranslations: Record<string, Translations> = {
  th: {
    'app.title': 'LiMeiHua Lightning Exchange',
    'app.subtitle': 'ศูนย์แลกเปลี่ยนสินทรัพย์ดิจิทัลแบบกระจายศูนย์',
    'app.description': 'แลกเปลี่ยน Token ด้วยเทคนิค Atomic Swap บน Bitcoin Lightning Network',
    'nav.home': 'หน้าหลัก',
    'nav.exchange': 'แลกเปลี่ยน',
    'nav.liquidity': 'สภาพคล่อง',
    'nav.rates': 'อัตราแลกเปลี่ยน',
    'nav.peers': 'เครือข่ายพาร์ทเนอร์',
    'nav.docs': 'เอกสาร',
    'nav.language': 'ภาษา',
    'hero.title': 'โครงสร้างพื้นฐานทางการเงินยุคใหม่',
    'hero.subtitle': 'แลกเปลี่ยนสินทรัพย์ดิจิทัลแบบกระจายศูนย์ด้วย Atomic Swap บน Lightning Network',
    'hero.cta': 'เริ่มแลกเปลี่ยน',
    'hero.docs': 'อ่านเอกสาร',
    'exchange.title': 'แลกเปลี่ยน Token',
    'exchange.from': 'จาก',
    'exchange.to': 'ไปยัง',
    'exchange.amount': 'จำนวน',
    'exchange.rate': 'อัตราแลกเปลี่ยน',
    'exchange.fee': 'ค่าธรรมเนียม',
    'exchange.swap': 'แลกเปลี่ยนเลย',
    'exchange.confirm': 'ยืนยันการแลกเปลี่ยน',
    'exchange.success': 'แลกเปลี่ยนสำเร็จ',
    'exchange.slippage': 'Slippage Tolerance',
    'liquidity.title': 'จัดการสภาพคล่อง',
    'liquidity.add': 'เพิ่มสภาพคล่อง',
    'liquidity.remove': 'ถอนสภาพคล่อง',
    'liquidity.share': 'แบ่งปันสภาพคล่อง',
    'liquidity.pool': 'Pool สภาพคล่อง',
    'liquidity.myPosition': 'ตำแหน่งของฉัน',
    'liquidity.totalLocked': 'มูลค่ารวมที่ล็อค',
    'liquidity.apy': 'ผลตอบแทนต่อปี',
    'rates.title': 'อัตราแลกเปลี่ยน',
    'rates.pair': 'คู่เหรียญ',
    'rates.price': 'ราคา',
    'rates.change24h': 'เปลี่ยนแปลง 24 ชม.',
    'rates.volume': 'ปริมาณซื้อขาย',
    'rates.manage': 'จัดการอัตรา',
    'rates.setRate': 'กำหนดอัตรา',
    'rates.autoRate': 'อัตราอัตโนมัติ',
    'rates.manualRate': 'กำหนดเอง',
    'rates.spread': 'ส่วนต่างราคา',
    'peers.title': 'เครือข่ายพาร์ทเนอร์',
    'peers.connect': 'เชื่อมต่อ',
    'peers.disconnect': 'ตัดการเชื่อมต่อ',
    'peers.addPeer': 'เพิ่มพาร์ทเนอร์',
    'peers.status': 'สถานะ',
    'peers.online': 'ออนไลน์',
    'peers.offline': 'ออฟไลน์',
    'peers.sharedLiquidity': 'สภาพคล่องที่แชร์',
    'peers.decentralized': 'เชื่อมต่อแบบกระจายศูนย์',
    'features.atomicSwap': 'Atomic Swap',
    'features.atomicSwapDesc': 'แลกเปลี่ยน Token อย่างปลอดภัยด้วย Hash Time-Locked Contracts (HTLC) บน Lightning Network',
    'features.lightning': 'Lightning Network',
    'features.lightningDesc': 'ทำธุรกรรมรวดเร็วด้วยค่าธรรมเนียมต่ำบนเครือข่าย Lightning Network ของ Bitcoin',
    'features.liquidity': 'แบ่งปันสภาพคล่อง',
    'features.liquidityDesc': 'แบ่งปันสภาพคล่องกับพาร์ทเนอร์แบบกระจายศูนย์ตามความสมัครใจ',
    'features.decentralized': 'กระจายศูนย์',
    'features.decentralizedDesc': 'ไม่มีตัวกลาง เชื่อมต่อกันโดยตรงแบบ Peer-to-Peer',
    'features.rateManagement': 'จัดการอัตราแลกเปลี่ยน',
    'features.rateManagementDesc': 'ครบทุกฟังก์ชันในการดูแลอัตราแลกเปลี่ยน ทั้งแบบอัตโนมัติและกำหนดเอง',
    'features.openSource': 'Open Source',
    'features.openSourceDesc': 'ซอร์สโค้ดเปิดให้นักพัฒนานำไปพัฒนาต่อได้อย่างอิสระ',
    'footer.credit': 'สร้างโดย Mr.Kanutsanan Pongpanna (นายคณัสนันท์ พงษ์พันนา)',
    'footer.purpose': 'โครงสร้างพื้นฐานทางการเงินยุคใหม่เพื่อรองรับการไหลของเงินจำนวนมหาศาลของท่านผู้เฒ่าหลี่เหมยฮัว',
    'footer.github': 'GitHub Repository',
    'footer.openSource': 'Open Source สำหรับนักพัฒนาทั่วโลก',
    'peace.title': 'Source Code แห่งสันติภาพ',
    'peace.subtitle': 'เข้าถึงปรัชญาทางการเงินด้วย Hard Money',
    'peace.description': 'มันจะทำให้การทำสงครามใหญ่มีแต่ขาดทุน มันจะทำให้ไม่มีใครทำกำไรได้จากสงครามอีก',
    'common.loading': 'กำลังโหลด...',
    'common.error': 'เกิดข้อผิดพลาด',
    'common.success': 'สำเร็จ',
    'common.cancel': 'ยกเลิก',
    'common.confirm': 'ยืนยัน',
    'common.save': 'บันทึก',
    'common.search': 'ค้นหา',
    'common.close': 'ปิด',
    'common.back': 'กลับ',
    'common.next': 'ถัดไป',
    'common.comingSoon': 'เร็วๆ นี้',
  },
  en: {
    'app.title': 'LiMeiHua Lightning Exchange',
    'app.subtitle': 'Decentralized Digital Asset Exchange',
    'app.description': 'Exchange tokens using Atomic Swap on Bitcoin Lightning Network',
    'nav.home': 'Home',
    'nav.exchange': 'Exchange',
    'nav.liquidity': 'Liquidity',
    'nav.rates': 'Exchange Rates',
    'nav.peers': 'Partner Network',
    'nav.docs': 'Documentation',
    'nav.language': 'Language',
    'hero.title': 'New Era Financial Infrastructure',
    'hero.subtitle': 'Decentralized digital asset exchange via Atomic Swap on Lightning Network',
    'hero.cta': 'Start Trading',
    'hero.docs': 'Read Docs',
    'exchange.title': 'Token Exchange',
    'exchange.from': 'From',
    'exchange.to': 'To',
    'exchange.amount': 'Amount',
    'exchange.rate': 'Exchange Rate',
    'exchange.fee': 'Fee',
    'exchange.swap': 'Swap Now',
    'exchange.confirm': 'Confirm Swap',
    'exchange.success': 'Swap Successful',
    'exchange.slippage': 'Slippage Tolerance',
    'liquidity.title': 'Manage Liquidity',
    'liquidity.add': 'Add Liquidity',
    'liquidity.remove': 'Remove Liquidity',
    'liquidity.share': 'Share Liquidity',
    'liquidity.pool': 'Liquidity Pool',
    'liquidity.myPosition': 'My Position',
    'liquidity.totalLocked': 'Total Value Locked',
    'liquidity.apy': 'APY',
    'rates.title': 'Exchange Rates',
    'rates.pair': 'Pair',
    'rates.price': 'Price',
    'rates.change24h': '24h Change',
    'rates.volume': 'Volume',
    'rates.manage': 'Manage Rates',
    'rates.setRate': 'Set Rate',
    'rates.autoRate': 'Auto Rate',
    'rates.manualRate': 'Manual Rate',
    'rates.spread': 'Spread',
    'peers.title': 'Partner Network',
    'peers.connect': 'Connect',
    'peers.disconnect': 'Disconnect',
    'peers.addPeer': 'Add Partner',
    'peers.status': 'Status',
    'peers.online': 'Online',
    'peers.offline': 'Offline',
    'peers.sharedLiquidity': 'Shared Liquidity',
    'peers.decentralized': 'Decentralized Connection',
    'features.atomicSwap': 'Atomic Swap',
    'features.atomicSwapDesc': 'Securely exchange tokens using Hash Time-Locked Contracts (HTLC) on Lightning Network',
    'features.lightning': 'Lightning Network',
    'features.lightningDesc': 'Fast transactions with low fees on Bitcoin Lightning Network',
    'features.liquidity': 'Shared Liquidity',
    'features.liquidityDesc': 'Share liquidity with partners in a decentralized manner',
    'features.decentralized': 'Decentralized',
    'features.decentralizedDesc': 'No intermediaries, direct Peer-to-Peer connections',
    'features.rateManagement': 'Rate Management',
    'features.rateManagementDesc': 'Complete exchange rate management with auto and manual options',
    'features.openSource': 'Open Source',
    'features.openSourceDesc': 'Open source code for developers to build upon freely',
    'footer.credit': 'Created by Mr.Kanutsanan Pongpanna',
    'footer.purpose': 'New era financial infrastructure for LiMeiHua Grand Mother',
    'footer.github': 'GitHub Repository',
    'footer.openSource': 'Open Source for developers worldwide',
    'peace.title': 'Source Code of Peace',
    'peace.subtitle': 'Accessing financial philosophy through Hard Money',
    'peace.description': 'It will make large-scale wars unprofitable. No one will profit from war anymore.',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.search': 'Search',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.comingSoon': 'Coming Soon',
  },
};

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  languages: Language[];
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | null>(null);

function detectBrowserLanguage(): string {
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.toLowerCase();
    const found = SUPPORTED_LANGUAGES.find(
      l => l.code.toLowerCase() === code || l.code.toLowerCase() === code.split('-')[0]
    );
    if (found) return found.code;
  }
  return 'th'; // Default to Thai
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>(() => {
    const saved = localStorage.getItem('limeihua-language');
    return saved || detectBrowserLanguage();
  });

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('limeihua-language', lang);
    document.documentElement.lang = lang;
    const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === lang);
    document.documentElement.dir = langInfo?.dir || 'ltr';
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === language);
    document.documentElement.dir = langInfo?.dir || 'ltr';
  }, [language]);

  const t = useCallback((key: string): string => {
    const translations = coreTranslations[language] || coreTranslations['en'] || coreTranslations['th'];
    return translations[key] || coreTranslations['th'][key] || coreTranslations['en'][key] || key;
  }, [language]);

  const dir = SUPPORTED_LANGUAGES.find(l => l.code === language)?.dir || 'ltr';

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
