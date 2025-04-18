// Function to generate bot response based on user input
function generateBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    let responses = {};
    
    // Sapaan - Multiple greetings
    responses.greetings = [
        "Halo! Saya adalah chatbot informasi tentang jurusan RPL. Ada yang ingin Anda ketahui tentang jurusan ini?",
        "Hai! Selamat datang di asisten RPL. Saya siap membantu menjawab pertanyaan seputar Rekayasa Perangkat Lunak.",
        "Selamat datang! Saya di sini untuk memberikan informasi lengkap tentang jurusan RPL. Apa yang ingin Anda tanyakan?",
        "Halo! Saya adalah bot informasi RPL. Silakan tanyakan apa saja seputar jurusan Rekayasa Perangkat Lunak.",
        "Hi there! Butuh informasi tentang RPL? Saya siap membantu Anda mengenal jurusan ini lebih dalam.",
        "Halo! Ingin tahu lebih banyak tentang Rekayasa Perangkat Lunak? Tanyakan pada saya!",
        "Selamat datang di asisten virtual RPL! Apa yang membuat Anda tertarik dengan jurusan ini?",
        "Halo! Saya adalah sumber informasi interaktif tentang RPL. Silakan ajukan pertanyaan Anda.",
        "Greetings! Saya siap memberikan insight mendalam tentang jurusan Rekayasa Perangkat Lunak. Apa yang ingin Anda ketahui?",
        "Halo dan selamat datang! Mari kita eksplorasi dunia RPL bersama. Apa yang ingin Anda pelajari hari ini?",
        "Hai! Saya adalah AI yang fokus pada informasi seputar RPL. Silakan tanyakan apa saja yang ingin Anda ketahui!",
        "Selamat datang di pusat informasi RPL! Saya akan membantu Anda memahami jurusan yang sangat prospektif ini."
    ];
    
    // Tentang RPL - What is RPL
    responses.aboutRPL = [
        "RPL (Rekayasa Perangkat Lunak) adalah jurusan yang berfokus pada pengembangan perangkat lunak secara sistematis, terstruktur, dan terukur. Jurusan ini mempelajari seluruh aspek pengembangan software mulai dari analisis kebutuhan hingga pemeliharaan sistem.",
        "Rekayasa Perangkat Lunak atau RPL adalah disiplin ilmu yang menggabungkan prinsip matematika, ilmu komputer, dan teknik untuk mengembangkan solusi perangkat lunak yang efisien. Tujuannya adalah menciptakan sistem yang andal, efektif, dan mudah dipelihara.",
        "RPL merupakan jurusan yang mempelajari metodologi pengembangan software profesional. Siswa akan belajar tentang proses sistematis dalam membangun aplikasi berkualitas tinggi, mulai dari perencanaan hingga implementasi dan evaluasi.",
        "Jurusan RPL membekali siswa dengan keterampilan komprehensif dalam membuat software. Ini mencakup pemrograman, analisis sistem, desain database, pengujian, dan manajemen proyek teknologi informasi.",
        "Rekayasa Perangkat Lunak adalah bidang studi yang fokus pada penciptaan solusi digital melalui pengembangan aplikasi dan sistem. Jurusan ini sangat relevan dengan transformasi digital yang sedang terjadi di berbagai sektor industri.",
        "RPL adalah program pendidikan yang mengajarkan cara membangun produk perangkat lunak dengan pendekatan engineering. Siswa belajar menerapkan prinsip-prinsip rekayasa dalam mengembangkan solusi software yang skalabel dan sustainable.",
        "Dalam jurusan RPL, Anda akan mempelajari seni dan sains di balik pembuatan software berkualitas tinggi. Fokusnya adalah pada proses pengembangan yang konsisten dan terukur untuk menghasilkan produk yang memenuhi kebutuhan pengguna.",
        "Rekayasa Perangkat Lunak adalah disiplin yang mengajarkan bagaimana merancang, membangun, dan memelihara sistem software kompleks. Jurusan ini mempersiapkan siswa untuk menghadapi tantangan dunia teknologi modern.",
        "RPL adalah jurusan yang memadukan teori dan praktik dalam pengembangan software. Siswa tidak hanya belajar coding, tetapi juga metodologi pengembangan, arsitektur sistem, dan manajemen proyek IT.",
        "Sebagai jurusan teknologi modern, RPL mempelajari seluruh siklus hidup pengembangan perangkat lunak. Ini mencakup analisis, desain, implementasi, pengujian, deployment, dan pemeliharaan sistem software.",
        "RPL merupakan kombinasi dari seni dan ilmu pengetahuan dalam menciptakan solusi digital. Jurusan ini mengajarkan bagaimana mentransformasi kebutuhan pengguna menjadi sistem yang fungsional dan user-friendly.",
        "Rekayasa Perangkat Lunak adalah bidang yang mempelajari cara mengembangkan produk software dengan pendekatan terstruktur dan metodis. Siswa akan menguasai berbagai teknik dan alat untuk menghasilkan aplikasi yang handal dan efisien."
    ];

    // Daftar guru RPL - RPL teachers
    responses.teachersList = [
        "Daftar guru RPL meliputi: Pak Jimi Listiawan, S.Kom. (mengajar kelas 11), Pak Achdijat Supriadi S.T (mengajar kelas 10), Pak Dwi Atmoko, M.Kom. (mengajar kelas 11), dan Ibu Mayati, S.Kom. (mengajar kelas 12).",
        "Tim pengajar jurusan RPL terdiri dari: Jimi Listiawan, S.Kom. (kelas 11), Achdijat Supriadi S.T (kelas 10), Dwi Atmoko, M.Kom. (kelas 11), dan Mayati, S.Kom. (kelas 12).",
        "Jurusan RPL diampu oleh beberapa guru: Pak Jimi Listiawan, S.Kom. untuk kelas 11, Pak Achdijat Supriadi S.T untuk kelas 10, Pak Dwi Atmoko, M.Kom. untuk kelas 11, dan Bu Mayati, S.Kom. untuk kelas 12.",
        "Tenaga pengajar di jurusan RPL: Jimi Listiawan, S.Kom. (pengajar kelas 11), Achdijat Supriadi S.T (pengajar kelas 10), Dwi Atmoko, M.Kom. (pengajar kelas 11), dan Mayati, S.Kom. (pengajar kelas 12).",
        "Guru-guru RPL dan tingkat kelasnya: Pak Jimi Listiawan, S.Kom. (kelas 11), Pak Achdijat Supriadi S.T (kelas 10), Pak Dwi Atmoko, M.Kom. (kelas 11), dan Ibu Mayati, S.Kom. (kelas 12).",
        "Staf pengajar jurusan RPL terdiri dari: Jimi Listiawan, S.Kom. (mengajar di kelas 11), Achdijat Supriadi S.T (mengajar di kelas 10), Dwi Atmoko, M.Kom. (mengajar di kelas 11), dan Mayati, S.Kom. (mengajar di kelas 12).",
        "Tim instruktur RPL: Pak Jimi Listiawan, S.Kom. (pembimbing kelas 11), Pak Achdijat Supriadi S.T (pembimbing kelas 10), Pak Dwi Atmoko, M.Kom. (pembimbing kelas 11), dan Bu Mayati, S.Kom. (pembimbing kelas 12).",
        "Pengajar jurusan RPL: Jimi Listiawan, S.Kom. (kelas 11), Achdijat Supriadi S.T (kelas 10), Dwi Atmoko, M.Kom. (kelas 11), dan Mayati, S.Kom. (kelas 12).",
        "Dosen jurusan RPL: Pak Jimi Listiawan, S.Kom. (bertanggung jawab untuk kelas 11), Pak Achdijat Supriadi S.T (bertanggung jawab untuk kelas 10), Pak Dwi Atmoko, M.Kom. (bertanggung jawab untuk kelas 11), dan Ibu Mayati, S.Kom. (bertanggung jawab untuk kelas 12).",
        "Pengajar ahli di jurusan RPL: Jimi Listiawan, S.Kom. (fokus pada kelas 11), Achdijat Supriadi S.T (fokus pada kelas 10), Dwi Atmoko, M.Kom. (fokus pada kelas 11), dan Mayati, S.Kom. (fokus pada kelas 12).",
        "Tim akademik RPL: Pak Jimi Listiawan, S.Kom. (pendidik kelas 11), Pak Achdijat Supriadi S.T (pendidik kelas 10), Pak Dwi Atmoko, M.Kom. (pendidik kelas 11), dan Bu Mayati, S.Kom. (pendidik kelas 12).",
        "Tenaga pendidik RPL: Jimi Listiawan, S.Kom. (mengajar siswa kelas 11), Achdijat Supriadi S.T (mengajar siswa kelas 10), Dwi Atmoko, M.Kom. (mengajar siswa kelas 11), dan Mayati, S.Kom. (mengajar siswa kelas 12)."
    ];
    
    // Kurikulum RPL - RPL curriculum
    responses.curriculum = [
        "Di RPL, Anda akan mempelajari: Pemrograman (Python, Java, JavaScript), Basis Data, Analisis Sistem, Desain UI/UX, Pengujian Software, Pengembangan Mobile, Web Development, Cloud Computing, DevOps, dan Project Management.",
        "Kurikulum RPL mencakup: Algoritma & Struktur Data, Pemrograman Berorientasi Objek, Database Management, Web & Mobile Development, Software Engineering, UI/UX Design, Testing & QA, Cloud Services, dan Project-based Learning.",
        "Materi yang dipelajari di RPL meliputi: Fundamental Programming, Object-Oriented Design, Database Systems, Web Technologies (HTML, CSS, JavaScript), Framework Development, Mobile Apps, Software Testing, Agile Methodology, dan Capstone Projects.",
        "Siswa RPL akan menguasai: Dasar Algoritma, Pemrograman dengan berbagai bahasa (Java, Python, PHP), Database SQL & NoSQL, Pengembangan Web Frontend & Backend, Mobile App Development, Software Quality Assurance, DevOps Practices, dan Real-world Projects.",
        "Jurusan RPL mengajarkan: Computer Science Fundamentals, Programming Languages, Software Architecture, Database Design, Web Development Stacks, Cross-platform Mobile Development, Quality Control, Version Control Systems, dan Collaborative Development.",
        "Kurikulum komprehensif RPL meliputi: Computational Thinking, Multiple Programming Paradigms, Data Management, Full-stack Web Development, Native & Hybrid Mobile Apps, User Interface Design, Test-Driven Development, dan Enterprise Solutions.",
        "Pelajaran di jurusan RPL: Logika Algoritma, Bahasa Pemrograman (C++, Java, Python), Sistem Basis Data, Frontend & Backend Development, Cross-platform Development, UI/UX Research, Software Maintenance, dan Industry-standard Practices.",
        "RPL mempelajari: Fundamental IT, Structured & Object-Oriented Programming, Database Administration, Web Stack Technologies, Mobile Framework Implementation, Interface Prototyping, Quality Assurance, Deployment Strategies, dan Professional Portfolio Building.",
        "Mata pelajaran RPL termasuk: Computational Logic, Programming Essentials, Database Systems, Web Development Lifecycle, Mobile Application Architecture, User Experience Design, Automated Testing, DevOps Culture, dan Final Year Projects.",
        "Di RPL Anda akan belajar: Algorithm Design, Core Programming Languages, Data Structure Implementation, Relational & Non-relational Databases, Web Services & APIs, Mobile Development Platforms, Human-Computer Interaction, Continuous Integration, dan Collaborative Software Projects.",
        "Kurikulum utama RPL mencakup: Problem Solving Techniques, Modern Programming Languages, Database Query Optimization, Responsive Web Design, Progressive Web Apps, Mobile Development Frameworks, Usability Testing, Deployment Pipelines, dan Industry Collaboration Projects.",
        "Siswa RPL mempelajari: Computing Foundations, Software Development Methodologies, Database Normalization, Backend & Frontend Technologies, iOS & Android Development, Wireframing & Prototyping, Debugging & Performance Tuning, Cloud Deployment, dan Client-based Projects."
    ];

    // Prospek Karir - Career prospects
    responses.careerProspects = [
        "Lulusan RPL memiliki prospek karir sebagai: Software Developer, Web Developer, Mobile App Developer, Database Administrator, System Analyst, UI/UX Designer, QA Engineer, DevOps Engineer, Project Manager IT, Game Developer, dan IT Consultant.",
        "Karir yang menjanjikan untuk lulusan RPL: Backend Engineer, Frontend Developer, Full-stack Developer, Mobile Developer, Database Specialist, Business Analyst, UX Researcher, Software Tester, Cloud Engineer, IT Project Coordinator, dan Technical Support Specialist.",
        "Lulusan RPL dapat berkarir sebagai: Application Developer, API Engineer, Web Application Specialist, Mobile Solution Expert, Data Engineer, System Integration Specialist, User Interface Designer, Software Quality Analyst, Release Engineer, Scrum Master, dan Technical Consultant.",
        "Prospek pekerjaan RPL meliputi: Software Engineer, Web Services Developer, Cross-platform Developer, Database Manager, Requirements Analyst, UI Developer, Test Automation Engineer, Infrastructure Engineer, Technical Product Manager, Data Scientist, dan Solution Architect.",
        "Karir di bidang RPL antara lain: Code Developer, Web Architect, Mobile UX Designer, Database Developer, Business Systems Analyst, Interaction Designer, Quality Control Specialist, Site Reliability Engineer, Digital Project Manager, Machine Learning Engineer, dan System Designer.",
        "Peluang karir lulusan RPL: Application Programmer, JavaScript Developer, Hybrid App Developer, SQL Developer, IT Systems Analyst, Visual Designer, Security Tester, Deployment Specialist, Agile Coach, Big Data Engineer, dan Enterprise Architect.",
        "Lulusan RPL siap bekerja sebagai: Backend Specialist, Frontend Expert, Native App Developer, NoSQL Administrator, Technical Business Analyst, Experience Designer, Performance Tester, CI/CD Specialist, Product Owner, AI Developer, dan Cloud Architect.",
        "Profesi yang dapat digeluti lulusan RPL: Software Craftsman, Web Solution Developer, Android/iOS Developer, Database Architect, Process Analyst, Interface Developer, Test Engineer, DevSecOps Specialist, Technical Lead, Data Visualization Expert, dan Integration Specialist.",
        "Jalur karir lulusan RPL: Application Engineer, E-commerce Developer, React Native Engineer, Data Modeler, Functional Analyst, Information Architect, QA Lead, Platform Engineer, IT Program Manager, Computer Vision Engineer, dan Technical Architect.",
        "Bidang pekerjaan RPL meliputi: Code Specialist, Progressive Web App Developer, Flutter Engineer, Data Warehouse Developer, Solutions Analyst, Design Technologist, Automated Test Engineer, Kubernetes Administrator, Development Manager, NLP Engineer, dan Software Architect.",
        "Karir potensial bagi lulusan RPL: Programming Expert, SPA Developer, Mobile Game Developer, ETL Developer, Enterprise Analyst, Accessibility Designer, Security Test Engineer, Docker Specialist, Technical Project Leader, Blockchain Developer, dan Microservices Architect.",
        "Lulusan RPL dapat menjadi: Software Specialist, API Integration Developer, React/Angular Expert, Database Performance Engineer, Digital Transformation Analyst, Motion Designer, Load Test Engineer, AWS Specialist, Agile Project Manager, IoT Developer, dan Systems Architect."
    ];

    // Skills - Skills
    responses.skills = [
        "Keterampilan utama di RPL: Pemrograman berbagai bahasa, Pengembangan web & mobile, Desain database, Problem solving, Analisis sistem, Version control, Testing, Framework & library, dan Soft skills seperti komunikasi dan kerja tim.",
        "Skill yang dikembangkan di RPL: Coding (multiprogramming languages), Web development stack, Application architecture, Database management, Analytical thinking, Git workflow, Debugging techniques, Framework implementation, dan Teamwork.",
        "Kemampuan yang diperoleh dari RPL: Algoritma pemrograman, Full-stack development, Mobile programming, Database design, System analysis, Project versioning, Quality assurance, API integration, Critical thinking, dan Communication skills.",
        "RPL membekali siswa dengan: Computational skills, Frontend & backend expertise, Cross-platform development, Data modeling, Requirements gathering, Collaborative development, Test automation, Framework customization, Problem solving, dan Project management.",
        "Kompetensi lulusan RPL: Multi-language programming, Web technologies mastery, Mobile app creation, Database optimization, Business analysis, Source code management, Systematic testing, Modern framework utilization, Logical thinking, dan Presentation skills.",
        "Skill set jurusan RPL: Algorithm development, Client & server programming, App deployment, Query optimization, System design, Collaborative versioning, Software quality control, Library implementation, Technical documentation, dan Client communication.",
        "RPL mengajarkan keterampilan: Structured programming, Web application development, Mobile UI programming, Database administration, Use case analysis, Distributed version control, Test-driven development, SDK implementation, Time management, dan Technical writing.",
        "Siswa RPL menguasai: Computing principles, Modern web stack, Native & hybrid development, Data architecture, Process modeling, Code collaboration, Software validation, Framework architecture, Critical analysis, dan User empathy.",
        "Kompetensi inti RPL: Programming logic, Web services development, Mobile platform mastery, DBMS expertise, Requirement analysis, Branch management, Quality standards, Technology integration, Adaptability, dan Problem decomposition.",
        "Keahlian dari jurusan RPL: Object-oriented programming, Web component development, Mobile backend integration, Query proficiency, Solution modeling, Merge conflict resolution, Security testing, Rapid prototyping, Agile mindset, dan Stakeholder management.",
        "Skill yang dilatih di RPL: Code optimization, Frontend frameworks, App store publishing, Database security, Systems thinking, Repository management, Regression testing, Component development, Continuous learning, dan English proficiency.",
        "RPL membangun kemampuan: Efficient coding, Web API development, Mobile performance optimization, Database scaling, Functional analysis, Feature branching, Integration testing, Library customization, Analytical thinking, dan Remote collaboration."
    ];

    // Sertifikasi - Certifications
    responses.certifications = [
        "Sertifikasi relevan untuk RPL: Junior Web Developer (BNSP), Junior Mobile Programmer (BNSP), Oracle Certified Associate Java, Microsoft Technology Associate, CompTIA A+, Python Certified, AWS Developer, Google Android Developer, CCNA, dan ISTQB.",
        "Sertifikasi yang bisa diambil lulusan RPL: LSP Web Development, Mobile App Developer (BNSP), Java SE Programmer, Microsoft Azure Fundamentals, CompTIA Network+, Python Institute Certification, AWS Solutions Architect, Android Associate Developer, Cisco Network Associate, dan Software Testing Foundation.",
        "Sertifikasi untuk meningkatkan nilai lulusan RPL: Web Programming (BNSP), Android Programming (BNSP), Oracle Java Certification, Microsoft 365 Fundamentals, CompTIA Security+, PCEP (Python), AWS Cloud Practitioner, Google Mobile Site Certification, CCNP, dan ISTQB Agile Tester.",
        "Sertifikasi profesional untuk RPL: Full-stack Developer (BNSP), React Native Developer (BNSP), Java EE Developer, Microsoft Data Fundamentals, IT Infrastructure (CompTIA), Python Developer Certification, AWS DevOps Engineer, Google UX Design, Cisco DevNet, dan ISTQB Test Manager.",
        "Sertifikasi industri untuk RPL: Frontend Developer (BNSP), Cross-platform Developer (BNSP), Java Programming (Oracle), Microsoft Power Platform, CompTIA Linux+, Python Web Developer, Amazon DynamoDB, Mobile Web Specialist, Cisco CyberOps, dan Software Testing Advanced Level.",
        "Sertifikasi keahlian RPL: JavaScript Developer (BNSP), Flutter Developer (BNSP), Java Architect, Microsoft 365 Developer, CompTIA Cloud+, Python Data Analysis, AWS Database Specialty, Google Analytics, Cisco Enterprise, dan ISTQB Security Tester.",
        "Sertifikasi untuk memperkuat CV lulusan RPL: PHP Developer (BNSP), Hybrid App Developer (BNSP), Spring Developer, Azure Developer, CompTIA Server+, Python AI Development, AWS Machine Learning, Google Cloud Engineer, Cisco Collaboration, dan ISTQB Performance Tester.",
        "Sertifikasi berharga bagi RPL: Node.js Developer (BNSP), iOS Developer (BNSP), Jakarta EE, Power BI Data Analyst, CompTIA Project+, Machine Learning with Python, AWS SysOps Administrator, Google Analytics Individual, Cisco Data Center, dan ISTQB Technical Test Analyst.",
        "Sertifikasi profesional yang diakui untuk RPL: MERN Stack Developer (BNSP), Unity Game Developer (BNSP), OCA Database, Microsoft Teams Administrator, CompTIA CySA+, Data Science with Python, AWS Solutions Architect Professional, Google Workspace, Cisco Security, dan ISTQB Model-Based Tester.",
        "Sertifikasi yang direkomendasikan untuk RPL: Vue.js Developer (BNSP), AR/VR Developer (BNSP), MySQL Database Administrator, Dynamics 365 Fundamentals, CompTIA Pentest+, Python for Finance, AWS Big Data, Google AdWords, Cisco Industrial, dan ISTQB Automotive Software Tester.",
        "Sertifikasi bernilai tinggi untuk RPL: API Developer (BNSP), Blockchain Developer (BNSP), MongoDB Professional, SharePoint Developer, CompTIA Cloud Secure, TensorFlow Developer, AWS Security Specialty, Google Analytics Advanced, Cisco IoT, dan ISTQB Mobile Application Testing.",
        "Pilihan sertifikasi untuk mahasiswa RPL: GraphQL Developer (BNSP), Game Developer (BNSP), PostgreSQL Associate, Office 365 Administrator, CompTIA CASP+, Artificial Intelligence with Python, AWS Advanced Networking, Google Data Studio, Cisco Collaboration, dan ISTQB Usability Testing."
    ];

    // Teknologi Terkini - Latest technologies
    responses.latestTech = [
        "Tren teknologi terkini untuk RPL: AI dan Machine Learning, Internet of Things (IoT), Blockchain, Cloud Computing, DevOps, Progressive Web Apps, Augmented Reality, Microservices Architecture, Edge Computing, dan Quantum Computing.",
        "Teknologi yang sedang berkembang di bidang RPL: Deep Learning, IoT Systems, Cryptocurrency Development, Serverless Architecture, CI/CD Pipeline, WebAssembly, Virtual Reality, Container Orchestration, 5G Applications, dan Post-Quantum Cryptography.",
        "Tren terbaru yang perlu diketahui siswa RPL: TensorFlow dan PyTorch, IoT Protocol Standards, Smart Contracts, Cloud-native Development, GitOps, JAMstack Architecture, Mixed Reality, API-first Design, Edge AI, dan Quantum Programming.",
        "Teknologi masa depan untuk praktisi RPL: Computer Vision, Industrial IoT, Blockchain Networks, Multi-cloud Strategy, Infrastructure as Code, Headless CMS, Immersive Web Experiences, Service Mesh, Fog Computing, dan Quantum Algorithms.",
        "Perkembangan teknologi di dunia RPL: NLP Applications, IoT Security, Decentralized Finance, Kubernetes Ecosystem, Site Reliability Engineering, WebXR, 3D Web, Domain-Driven Design, Distributed Edge, dan Quantum Machine Learning.",
        "Teknologi disruptif dalam RPL: Automated ML, IoT Analytics, NFT Development, Cloud Automation, AIOps, Web Components, Spatial Computing, Event-Driven Architecture, Intelligent Edge, dan Topological Quantum Computing.",
        "Inovasi teknologi untuk RPL: Generative AI, IoT Platforms, Layer-2 Blockchain Solutions, FinOps, DevSecOps, Web3, Extended Reality, Microfrontends, Confidential Computing, dan Quantum Internet.",
        "Teknologi yang menjadi fokus industri RPL: Reinforcement Learning, Digital Twins, Decentralized Applications, Cloud-native Security, Value Stream Delivery, Browser Extension Development, Spatial Web, API Management, Confidential Computing, dan Quantum Error Correction.",
        "Tren teknologi yang dibutuhkan lulusan RPL: MLOps, Embedded IoT, Blockchain Oracles, Hybrid Cloud, Platform Engineering, Progressive Enhancement, Virtual Production, Backend-For-Frontend Pattern, Secure Access Service Edge, dan Quantum Development Kits.",
        "Teknologi yang perlu dipahami praktisi RPL: AI Ethics, LPWAN Technologies, Tokenomics, Cloud Cost Optimization, Chaos Engineering, Web Payments API, Volumetric Capture, API Gateway, Trusted Execution Environment, dan Quantum Simulation.",
        "Kemajuan teknologi dalam RPL: Computer Vision AI, IoT Edge Computing, zkRollups, Cloud Workload Protection, Observability Platforms, WebGPU, Photogrammetry, GraphQL Federation, Trusted Platform Module, dan Quantum Supremacy Applications.",
        "Inovasi dalam ekosistem RPL: AI Explainability, Massive IoT, Layer-1 Blockchain, Sustainable Cloud Computing, Continuous Security Validation, WebTransport, Motion Tracking, API Composition, Confidential Containers, dan Quantum Resistant Cryptography."
    ];

    // Terima kasih - Thank you responses
    responses.thanks = [
        "Sama-sama! Ada yang bisa saya bantu lagi seputar jurusan RPL?",
        "Dengan senang hati! Ada pertanyaan lain tentang RPL yang ingin Anda tanyakan?",
        "Tidak masalah! Saya siap membantu jika Anda memiliki pertanyaan lainnya tentang dunia RPL.",
        "Senang bisa membantu! Ada hal lain yang ingin Anda ketahui tentang RPL?",
        "Sama-sama! Jangan ragu untuk bertanya lagi jika membutuhkan informasi tambahan.",
        "You're welcome! Ada topik RPL lain yang ingin kita bahas?",
        "Terima kasih kembali! Semoga informasi tadi bermanfaat. Ada yang masih ingin ditanyakan?",
        "Dengan pleasure! Masih ada yang ingin didiskusikan tentang jurusan RPL?",
        "No problem! Saya di sini untuk membantu Anda memahami jurusan RPL dengan lebih baik.",
        "Anytime! Masih penasaran dengan aspek lain dari Rekayasa Perangkat Lunak?",
        "Sama-sama! Semoga informasinya membantu keputusan Anda terkait jurusan RPL.",
        "Tidak perlu berterima kasih! Saya senang bisa berbagi informasi tentang RPL dengan Anda."
    ];

    // Default responses - Unknown queries
    responses.default = [
        "Maaf, saya belum bisa menjawab pertanyaan tersebut. Silakan coba pertanyaan lain seputar RPL atau gunakan tombol navigasi untuk topik umum.",
        "Hmm, saya belum memiliki informasi tentang hal itu. Bagaimana jika Anda menanyakan seputar kurikulum, prospek karir, atau skill yang dipelajari di RPL?",
        "Pertanyaan Anda di luar pengetahuan saya saat ini. Coba tanyakan tentang mata pelajaran RPL, peluang kerja, atau sertifikasi yang relevan?",
        "Saya belum memiliki jawaban untuk itu. Mungkin Anda tertarik mengetahui tentang teknologi terbaru di RPL, daftar guru, atau skill yang dipelajari?",
        "Maaf, informasi tersebut tidak tersedia. Bagaimana jika kita membahas tentang apa itu RPL, prospek karirnya, atau kurikulum yang dipelajari?",
        "Saya tidak mengenali pertanyaan tersebut. Anda bisa bertanya tentang definisi RPL, skill yang dibutuhkan, atau sertifikasi yang berguna untuk lulusan RPL.",
        "Pertanyaan Anda berada di luar cakupan pengetahuan saya. Mari kita bahas tentang jurusan RPL, guru-guru yang mengajar, atau teknologi yang dipelajari?",
        "Saya masih belajar dan belum bisa menjawab pertanyaan itu. Mungkin Anda ingin tahu tentang mata pelajaran RPL, peluang kerja, atau tools yang digunakan?",
        "Maaf, saya tidak memiliki informasi tentang hal tersebut. Bagaimana jika Anda bertanya tentang definisi RPL, keahlian yang dipelajari, atau prospek karir lulusannya?",
        "Saya belum diprogram untuk menjawab pertanyaan tersebut. Silakan coba tanyakan tentang apa itu jurusan RPL, skill yang dikembangkan, atau sertifikasi yang dapat diambil.",
        "Pertanyaan ini di luar database saya. Anda bisa menanyakan tentang kurikulum RPL, karir lulusan RPL, atau teknologi terkini yang relevan dengan RPL.",
        "Maaf, saya tidak dapat membantu dengan pertanyaan tersebut. Bagaimana jika kita diskusikan tentang apa saja yang dipelajari di RPL, daftar pengajar, atau prospek masa depannya?"
    ];

    // Function to get random response from category
    function getRandomResponse(category) {
        const responseArray = responses[category];
        const randomIndex = Math.floor(Math.random() * responseArray.length);
        return responseArray[randomIndex];
    }
    
    // Logic to determine which category of response to use
    if (userMessage.includes('halo') || userMessage.includes('hai') || userMessage.includes('hello') || userMessage.includes('hi')) {
        return getRandomResponse('greetings');
    } 
    else if (userMessage.includes('apa itu rpl') || userMessage.includes('tentang rpl') || userMessage.includes('definisi rpl') || userMessage.includes('pengertian rpl')) {
        return getRandomResponse('aboutRPL');
    } 
    else if (userMessage.includes('daftar guru') || userMessage.includes('pengajar') || userMessage.includes('dosen') || userMessage.includes('instruktur')) {
        return getRandomResponse('teachersList');
    } 
    else if (userMessage.includes('pelajari') || userMessage.includes('dipelajari') || userMessage.includes('mata pelajaran') || userMessage.includes('kurikulum') || userMessage.includes('materi')) {
        return getRandomResponse('curriculum');
    }
    else if (userMessage.includes('prospek karir') || userMessage.includes('pekerjaan') || userMessage.includes('kerja') || userMessage.includes('profesi') || userMessage.includes('karir')) {
        return getRandomResponse('careerProspects');
    }
    else if (userMessage.includes('skill') || userMessage.includes('keterampilan') || userMessage.includes('kemampuan') || userMessage.includes('keahlian') || userMessage.includes('kompetensi')) {
        return getRandomResponse('skills');
    }
    else if (userMessage.includes('sertifikasi') || userMessage.includes('sertifikat') || userMessage.includes('lisensi') || userMessage.includes('kredensial')) {
        return getRandomResponse('certifications');
    }
    else if (userMessage.includes('teknologi') || userMessage.includes('tren') || userMessage.includes('trend') || userMessage.includes('perkembangan') || userMessage.includes('inovasi')) {
        return getRandomResponse('latestTech');
    }
    else if (userMessage.includes('terima kasih') || userMessage.includes('thanks') || userMessage.includes('makasih') || userMessage.includes('thank you')) {
        return getRandomResponse('thanks');
    }
    else {
        return getRandomResponse('default');
    }
}

// Example of how to use this function:
// const userInput = "Halo, tolong jelaskan apa itu RPL";
// const botResponse = generateBotResponse(userInput);
// console.log(botResponse);