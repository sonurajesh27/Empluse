export type Language = 'en' | 'ta' | 'hi' | 'ml' | 'kn'

export interface TranslationDict {
  [key: string]: {
    en: string
    ta: string
    hi: string
    ml: string
    kn: string
  }
}

export const translations: TranslationDict = {
  // Splash
  'splash.title': {
    en: 'EmPulse',
    ta: 'EmPulse',
    hi: 'EmPulse',
    ml: 'EmPulse',
    kn: 'EmPulse',
  },
  'splash.tagline': {
    en: 'AI-Powered Workforce Retention',
    ta: 'AI-இயக்கப்படும் பணியாளர் தக்கவைப்பு',
    hi: 'AI-संचालित कार्यबल प्रतिधारण',
    ml: 'AI-പവർഡ് വർക്ക്ഫോഴ്സ് റിറ്റെൻഷൻ',
    kn: 'AI-ಚಾಲಿತ ಕಾರ್ಯಪಡೆ ಧಾರಣ',
  },
  'splash.enter': {
    en: 'Enter Platform',
    ta: 'நுழைக',
    hi: 'प्लेटफ़ॉर्म में प्रवेश करें',
    ml: 'പ്ലാറ്റ്ഫോം നൽകുക',
    kn: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ನಮೂದಿಸಿ',
  },
  'splash.subtitle': {
    en: 'Giving every worker a voice. Giving every manager clarity.',
    ta: 'ஒவ்வொரு தொழிலாளிக்கும் குரல். ஒவ்வொரு மேலாளருக்கும் தெளிவு.',
    hi: 'हर कर्मचारी को आवाज़। हर प्रबंधक को स्पष्टता।',
    ml: 'ഓരോ തൊഴിലാളിക്കും ശബ്ദം. ഓരോ മാനേജർക്കും വ്യക്തത.',
    kn: 'ಪ್ರತಿ ಕೆಲಸಗಾರನಿಗೆ ಧ್ವನಿ. ಪ್ರತಿ ಮ್ಯಾನೇಜರ್‌ಗೆ ಸ್ಪಷ್ಟತೆ.',
  },

  // Role select
  'role.who': {
    en: 'Who are you?',
    ta: 'நீங்கள் யார்?',
    hi: 'आप कौन हैं?',
    ml: 'നിങ്ങൾ ആരാണ്?',
    kn: 'ನೀವು ಯಾರು?',
  },
  'role.employee': {
    en: 'Employee',
    ta: 'ஊழியர்',
    hi: 'कर्मचारी',
    ml: 'ജീവനക്കാരൻ',
    kn: 'ಉದ್ಯೋಗಿ',
  },
  'role.hr': {
    en: 'HR Manager',
    ta: 'மனிதவள மேலாளர்',
    hi: 'मानव संसाधन प्रबंधक',
    ml: 'എച്ച്ആർ മാനേജർ',
    kn: 'ಎಚ್‌ಆರ್ ಮ್ಯಾನೇಜರ್',
  },
  'role.admin': {
    en: 'Admin',
    ta: 'நிர்வாகி',
    hi: 'व्यवस्थापक',
    ml: 'അഡ്മിൻ',
    kn: 'ನಿರ್ವಾಹಕ',
  },
  'role.owner': {
    en: 'Owner',
    ta: 'உரிமையாளர்',
    hi: 'मालिक',
    ml: 'ഉടമ',
    kn: 'ಮಾಲೀಕ',
  },

  // Employee dashboard
  'employee.home': {
    en: 'Home',
    ta: 'முகப்பு',
    hi: 'होम',
    ml: 'ഹോം',
    kn: 'ಹೋಮ್',
  },
  'employee.complaints': {
    en: 'Complaints',
    ta: 'புகார்கள்',
    hi: 'शिकायतें',
    ml: 'പരാതികൾ',
    kn: 'ದೂರುಗಳು',
  },
  'employee.rewards': {
    en: 'Rewards',
    ta: 'வெகுமதிகள்',
    hi: 'पुरस्कार',
    ml: 'റിവാർഡുകൾ',
    kn: 'ಪ್ರಶಸ್ತಿಗಳು',
  },
  'employee.vote': {
    en: 'Vote',
    ta: 'வாக்கு',
    hi: 'वोट',
    ml: 'വോട്ട്',
    kn: 'ಮತ',
  },
  'employee.feedbackWindow': {
    en: 'Feedback Window',
    ta: 'கருத்து சாளரம்',
    hi: 'फीडबैक विंडो',
    ml: 'ഫീഡ്ബാക്ക് വിൻഡോ',
    kn: 'ಪ್ರತಿಕ್ರಿಯೆ ವಿಂಡೋ',
  },
  'employee.raiseIssue': {
    en: 'Raise New Issue',
    ta: 'புதிய புகார்',
    hi: 'नई शिकायत दर्ज करें',
    ml: 'പുതിയ പരാതി ഉയർത്തുക',
    kn: 'ಹೊಸ ಸಮಸ್ಯೆ ಎತ್ತಿ',
  },
  'employee.sectorPulse': {
    en: 'Sector Pulse',
    ta: 'துறை துடிப்பு',
    hi: 'सेक्टर पल्स',
    ml: 'സെക്ടർ പൾസ്',
    kn: 'ಸೆಕ್ಟರ್ ಪಲ್ಸ್',
  },

  // Complaint flow
  'complaint.category': {
    en: 'What is the issue about?',
    ta: 'பிரச்சினை எதைப் பற்றியது?',
    hi: 'समस्या किस बारे में है?',
    ml: 'പ്രശ്നം എന്താണ്?',
    kn: 'ಸಮಸ್ಯೆ ಏನು?',
  },
  'complaint.subcategory': {
    en: 'Select the specific issue:',
    ta: 'குறிப்பிட்ட பிரச்சினையை தேர்வு செய்க:',
    hi: 'विशिष्ट मुद्दा चुनें:',
    ml: 'നിർദ്ദിഷ്ട പ്രശ്നം തിരഞ്ഞെടുക്കുക:',
    kn: 'ನಿರ್ದಿಷ್ಟ ಸಮಸ್ಯೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
  },
  'complaint.describe': {
    en: 'Describe the issue',
    ta: 'பிரச்சினையை விவரிக்கவும்',
    hi: 'समस्या का वर्णन करें',
    ml: 'പ്രശ്നം വിവരിക്കുക',
    kn: 'ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ',
  },
  'complaint.confirm': {
    en: 'Confirm & Submit',
    ta: 'உறுதிப்படுத்தி சமர்ப்பிக்கவும்',
    hi: 'पुष्टि करें और सबमिट करें',
    ml: 'സ്ഥിരീകരിക്കുക & സമർപ്പിക്കുക',
    kn: 'ದೃಢೀಕರಿಸಿ ಮತ್ತು ಸಲ್ಲಿಸಿ',
  },
  'complaint.submit': {
    en: 'Submit Complaint',
    ta: 'புகார் சமர்ப்பிக்கவும்',
    hi: 'शिकायत दर्ज करें',
    ml: 'പരാതി സമർപ്പിക്കുക',
    kn: 'ದೂರು ಸಲ್ಲಿಸಿ',
  },
  'complaint.voice': {
    en: '🎤 Voice',
    ta: '🎤 குரல்',
    hi: '🎤 आवाज़',
    ml: '🎤 ശബ്ദം',
    kn: '🎤 ಧ್ವನಿ',
  },
  'complaint.text': {
    en: '✏️ Text',
    ta: '✏️ உரை',
    hi: '✏️ पाठ',
    ml: '✏️ ടെക്സ്റ്റ്',
    kn: '✏️ ಪಠ್ಯ',
  },
  'complaint.anonymous': {
    en: 'Submitting anonymously. Your identity is never revealed.',
    ta: 'அநாமதேயமாக சமர்ப்பிக்கிறது. உங்கள் அடையாளம் வெளிப்படுத்தப்படாது.',
    hi: 'गुमनाम रूप से सबमिट कर रहे हैं। आपकी पहचान कभी प्रकट नहीं होती।',
    ml: 'അജ്ഞാതമായി സമർപ്പിക്കുന്നു. നിങ്ങളുടെ ഐഡന്റിറ്റി ഒരിക്കലും വെളിപ്പെടുത്തില്ല.',
    kn: 'ಅನಾಮಧೇಯವಾಗಿ ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ. ನಿಮ್ಮ ಗುರುತು ಎಂದಿಗೂ ಬಹಿರಂಗವಾಗುವುದಿಲ್ಲ.',
  },

  // Common
  'common.back': {
    en: 'Back',
    ta: 'பின்',
    hi: 'वापस',
    ml: 'മടങ്ങുക',
    kn: 'ಹಿಂದೆ',
  },
  'common.logout': {
    en: 'Logout',
    ta: 'வெளியேறு',
    hi: 'लॉग आउट',
    ml: 'ലോഗൗട്ട്',
    kn: 'ಲಾಗ್ ಔಟ್',
  },
  'common.next': {
    en: 'Next',
    ta: 'அடுத்து',
    hi: 'अगला',
    ml: 'അടുത്തത്',
    kn: 'ಮುಂದೆ',
  },
  'common.submit': {
    en: 'Submit',
    ta: 'சமர்ப்பி',
    hi: 'जमा करें',
    ml: 'സമർപ്പിക്കുക',
    kn: 'ಸಲ್ಲಿಸಿ',
  },

  // Login
  'login.title.admin': { en: 'Admin Login', ta: 'நிர்வாகி உள்நுழைவு', hi: 'व्यवस्थापक लॉगिन', ml: 'അഡ്മിൻ ലോഗിൻ', kn: 'ನಿರ್ವಾಹಕ ಲಾಗಿನ್' },
  'login.title.hr': { en: 'HR Manager Login', ta: 'மனிதவள மேலாளர் உள்நுழைவு', hi: 'एचआर मैनेजर लॉगिन', ml: 'എച്ച്ആർ മാനേജർ ലോഗിൻ', kn: 'ಎಚ್‌ಆರ್ ಮ್ಯಾನೇಜರ್ ಲಾಗಿನ್' },
  'login.title.owner': { en: 'Owner Login', ta: 'உரிமையாளர் உள்நுழைவு', hi: 'मालिक लॉगिन', ml: 'ഉടമ ലോഗിൻ', kn: 'ಮಾಲೀಕ ಲಾಗಿನ್' },
  'login.subtitle': { en: 'Enter your 4-digit PIN to continue', ta: 'தொடர 4 இலக்க PIN ஐ உள்ளிடவும்', hi: 'जारी रखने के लिए 4 अंकों का पिन दर्ज करें', ml: '4 അക്ക PIN നൽകുക', kn: 'ಮುಂದುವರಿಸಲು 4-ಅಂಕಿ PIN ನಮೂದಿಸಿ' },
  'login.verify': { en: 'Verify PIN', ta: 'PIN சரிபார்க்க', hi: 'पिन सत्यापित करें', ml: 'PIN പരിശോധിക്കുക', kn: 'PIN ಪರಿಶೀಲಿಸಿ' },
  'login.verifying': { en: 'Verifying...', ta: 'சரிபார்க்கிறது...', hi: 'सत्यापित हो रहा है...', ml: 'പരിശോധിക്കുന്നു...', kn: 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' },
  'login.forgot': { en: 'Forgot your PIN?', ta: 'PIN மறந்துவிட்டதா?', hi: 'पिन भूल गए?', ml: 'PIN മറന്നോ?', kn: 'PIN ಮರೆತಿರಾ?' },
  'login.incorrect': { en: 'Incorrect PIN. Please try again.', ta: 'தவறான PIN. மீண்டும் முயற்சிக்கவும்.', hi: 'गलत पिन। कृपया पुनः प्रयास करें।', ml: 'തെറ്റായ PIN. വീണ്ടും ശ്രമിക്കുക.', kn: 'ತಪ್ಪಾದ PIN. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' },

  // Fingerprint
  'fingerprint.title': { en: 'Verify Identity', ta: 'அடையாளத்தை சரிபார்க்கவும்', hi: 'पहचान सत्यापित करें', ml: 'ഐഡന്റിറ്റി പരിശോധിക്കുക', kn: 'ಗುರುತನ್ನು ಪರಿಶೀಲಿಸಿ' },
  'fingerprint.subtitle': { en: 'Place your finger on the sensor to authenticate', ta: 'அங்கீகரிக்க சென்சாரில் விரலை வைக்கவும்', hi: 'प्रमाणित करने के लिए सेंसर पर उंगली रखें', ml: 'ആധികാരികമാക്കാൻ സെൻസറിൽ വിരൽ വെക്കുക', kn: 'ದೃಢೀಕರಿಸಲು ಸೆನ್ಸರ್‌ನಲ್ಲಿ ಬೆರಳನ್ನು ಇಡಿ' },
  'fingerprint.idle': { en: 'Tap to scan fingerprint', ta: 'ஸ்கேன் செய்ய தட்டவும்', hi: 'स्कैन करने के लिए टैप करें', ml: 'സ്കാൻ ചെയ്യാൻ ടാപ്പ് ചെയ്യുക', kn: 'ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ' },
  'fingerprint.scanning': { en: 'Scanning…', ta: 'ஸ்கேன் செய்கிறது…', hi: 'स्कैनिंग…', ml: 'സ്കാൻ ചെയ്യുന്നു…', kn: 'ಸ್ಕ್ಯಾನ್ ಆಗುತ್ತಿದೆ…' },
  'fingerprint.verified': { en: 'Identity verified!', ta: 'அடையாளம் சரிபார்க்கப்பட்டது!', hi: 'पहचान सत्यापित!', ml: 'ഐഡന്റിറ്റി പരിശോധിച്ചു!', kn: 'ಗುರುತು ಪರಿಶೀಲಿಸಲಾಗಿದೆ!' },
  'fingerprint.privacyNote': { en: 'Your identity is verified via biometric. No personal data is stored beyond this session.', ta: 'உங்கள் அடையாளம் பயோமெட்ரிக் மூலம் சரிபார்க்கப்படுகிறது. இந்த அமர்வுக்கு அப்பால் தனிப்பட்ட தரவு சேமிக்கப்படாது.', hi: 'आपकी पहचान बायोमेट्रिक से सत्यापित है। इस सत्र के बाद कोई व्यक्तिगत डेटा संग्रहीत नहीं होता।', ml: 'നിങ്ങളുടെ ഐഡന്റിറ്റി ബയോമെട്രിക് വഴി പരിശോധിക്കുന്നു. ഈ സെഷനിൽ കവിഞ്ഞ് വ്യക്തിഗത ഡാറ്റ സംഭരിക്കില്ല.', kn: 'ನಿಮ್ಮ ಗುರುತನ್ನು ಬಯೋಮೆಟ್ರಿಕ್ ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ. ಈ ಸೆಷನ್ ನಂತರ ವೈಯಕ್ತಿಕ ಡೇಟಾ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.' },

  // Employee dashboard extra
  'employee.myComplaints': { en: 'My Complaints', ta: 'எனது புகார்கள்', hi: 'मेरी शिकायतें', ml: 'എന്റെ പരാതികൾ', kn: 'ನನ್ನ ದೂರುಗಳು' },
  'employee.total': { en: 'Total', ta: 'மொத்தம்', hi: 'कुल', ml: 'മൊത്തം', kn: 'ಒಟ್ಟು' },
  'employee.pending': { en: 'Pending', ta: 'நிலுவையில்', hi: 'लंबित', ml: 'തീർപ്പാക്കാത്ത', kn: 'ಬಾಕಿ' },
  'employee.resolved': { en: 'Resolved', ta: 'தீர்க்கப்பட்டது', hi: 'हल किया गया', ml: 'പരിഹരിച്ചു', kn: 'ಪರಿಹരിಸಲಾಗಿದೆ' },

  // Daily Pulse
  'pulse.question': {
    en: 'How was your day?',
    ta: 'உங்கள் நாள் எப்படி இருந்தது?',
    hi: 'आपका दिन कैसा रहा?',
    ml: 'നിങ്ങളുടെ ദിവസം എങ്ങനെയായിരുന്നു?',
    kn: 'ನಿಮ್ಮ ದಿನ ಹೇಗಿತ್ತು?',
  },
  'pulse.thanks': {
    en: 'Thanks! Your mood has been recorded.',
    ta: 'நன்றி! உங்கள் மனநிலை பதிவு செய்யப்பட்டது.',
    hi: 'धन्यवाद! आपका मूड रिकॉर्ड किया गया।',
    ml: 'നന്ദി! നിങ്ങളുടെ മൂഡ് രേഖപ്പെടുത്തി.',
    kn: 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಮೂಡ್ ದಾಖಲಿಸಲಾಗಿದೆ.',
  },

  // Vote
  'vote.confirm': {
    en: 'Vote for {name}? This cannot be changed.',
    ta: '{name} க்கு வாக்கு? இது மாற்ற முடியாது.',
    hi: '{name} को वोट? इसे बदला नहीं जा सकता।',
    ml: '{name} ന് വോട്ട്? ഇത് മാറ്റാൻ കഴിയില്ല.',
    kn: '{name} ಗೆ ಮತ? ಇದನ್ನು ಬದಲಾಯಿಸಲಾಗುವುದಿಲ್ಲ.',
  },
  'vote.locked': {
    en: '✓ Vote locked',
    ta: '✓ வாக்கு பூட்டப்பட்டது',
    hi: '✓ वोट लॉक',
    ml: '✓ വോട്ട് ലോക്ക്',
    kn: '✓ ಮತ ಲಾಕ್',
  },
  'vote.results': {
    en: 'Results in {days} days',
    ta: '{days} நாளில் முடிவுகள்',
    hi: '{days} दिन में परिणाम',
    ml: '{days} ദിവസത്തിൽ ഫലങ്ങൾ',
    kn: '{days} ದಿನಗಳಲ್ಲಿ ಫಲಿತಾಂಶಗಳು',
  },
}
