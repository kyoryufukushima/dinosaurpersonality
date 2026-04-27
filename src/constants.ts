import { Question, DinosaurProfile } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "休日の過ごし方は？",
    answers: [
      { text: "外でアクティブに動きたい", scores: { "T-Rex": 2, "Megalosaurus": 2, "Zavacephale": 1 } },
      { text: "家でゆっくり過ごしたい", scores: { "Stegosaurus": 2, "Pinacosaurus": 2, "Ankylosaurus": 1 } },
      { text: "家族や友人と賑やかに過ごしたい", scores: { "Iguanodon": 2, "Zavacephale": 2, "T-Rex": 1 } },
      { text: "趣味に没頭して自分磨きをしたい", scores: { "Megalosaurus": 1, "Stegosaurus": 1, "Zavacephale": 1, "Ankylosaurus": 1 } },
    ]
  },
  {
    id: 2,
    text: "グループの中でのあなたの立ち位置は？",
    answers: [
      { text: "グイグイ引っ張るリーダー的存在", scores: { "T-Rex": 3, "Megalosaurus": 2 } },
      { text: "みんなを支える縁の下の力持ち", scores: { "Iguanodon": 2, "Ankylosaurus": 2, "Pinacosaurus": 1 } },
      { text: "一歩引いて全体を把握する調整役", scores: { "Stegosaurus": 2, "Pinacosaurus": 2 } },
      { text: "場を盛り上げるムードメーカー", scores: { "Zavacephale": 3, "Iguanodon": 1 } },
    ]
  },
  {
    id: 3,
    text: "新しいことに挑戦する時の気持ちは？",
    answers: [
      { text: "「面白そう！」と勢いで挑戦", scores: { "Megalosaurus": 3, "T-Rex": 1, "Zavacephale": 1 } },
      { text: "メリットがあるならやってみる", scores: { "T-Rex": 2, "Iguanodon": 2 } },
      { text: "石橋を叩いて、慎重に進む", scores: { "Pinacosaurus": 3, "Ankylosaurus": 2, "Stegosaurus": 1 } },
      { text: "挑戦は苦手。現状維持がいい", scores: { "Ankylosaurus": 1, "Pinacosaurus": 1 } },
    ]
  },
  {
    id: 4,
    text: "物事を決める時の決め手は？",
    answers: [
      { text: "「ビビッ」ときた直感", scores: { "T-Rex": 2, "Zavacephale": 2 } },
      { text: "データや事実に基づいた論理", scores: { "Megalosaurus": 2, "Stegosaurus": 1, "Pinacosaurus": 1 } },
      { text: "周囲の人にどう思われるか", scores: { "Iguanodon": 3, "Ankylosaurus": 1 } },
      { text: "これまでの経験と実績", scores: { "Pinacosaurus": 3, "Ankylosaurus": 1 } },
    ]
  },
  {
    id: 5,
    text: "あなたが「一番やりがいを感じる瞬間」は？",
    answers: [
      { text: "大きな困難を乗り越えて、最高の結果を出した時", scores: { "T-Rex": 3, "Megalosaurus": 1 } },
      { text: "自分の立てた計画通りに、物事がスムーズに進んだ時", scores: { "Pinacosaurus": 3, "Ankylosaurus": 1 } },
      { text: "自分の働きによって、周囲の人が喜んでくれた時", scores: { "Iguanodon": 3, "Ankylosaurus": 1 } },
      { text: "誰にも真似できない、自分らしいこだわりを貫けた時", scores: { "Stegosaurus": 2, "Zavacephale": 2, "Megalosaurus": 1 } },
    ]
  },
  {
    id: 6,
    text: "「これだけは譲れない！」というこだわりは？",
    answers: [
      { text: "挨拶や礼儀はきっちりしたい", scores: { "Iguanodon": 2, "Pinacosaurus": 2, "Ankylosaurus": 1 } },
      { text: "時間は1分たりとも無駄にしたくない", scores: { "T-Rex": 2, "Megalosaurus": 2 } },
      { text: "何よりも「自分らしさ」が最優先", scores: { "Zavacephale": 3, "Stegosaurus": 2 } },
      { text: "縛られずに自由に動いていたい", scores: { "Megalosaurus": 1, "Zavacephale": 1 } },
    ]
  },
  {
    id: 7,
    text: "あなたの普段のテンションは？",
    answers: [
      { text: "朝から晩までハイテンション！", scores: { "T-Rex": 2, "Zavacephale": 2, "Megalosaurus": 1 } },
      { text: "基本的にはフラットで穏やか", scores: { "Iguanodon": 1, "Ankylosaurus": 1 } },
      { text: "やる時はやる、抜く時は抜く", scores: { "Megalosaurus": 2, "Iguanodon": 1 } },
      { text: "自分の世界に没頭して静か", scores: { "Stegosaurus": 3, "Pinacosaurus": 1 } },
    ]
  }
];

export const DINOSAUR_PROFILES: DinosaurProfile[] = [
  {
    type: "T-Rex",
    name: "ティラノサウルス",
    scientificName: "Tyrannosaurus rex",
    description: "あなたは圧倒的な存在感とリーダーシップを持つ主人公タイプ。目標に向かって突き進む力強さは周囲を惹きつけ、自然と中心的な存在になります。困難な状況でも決して屈せず、自らの力で道を切り拓いていくことができます。決断力に優れ、周囲が困っている時こそ真価を発揮する頼もしさを持っています。",
    traits: ["リーダーシップ", "情熱的", "自信家", "勇敢"],
    imageUrl: "T-Rex.jpg",
    color: "#ef4444",
    compatibleType: "Iguanodon",
    compatibilityMessage: "あなたの強力なリーダーシップを、イグアノドンの持つ柔軟性と器用さが完璧にサポートしてくれます。お互いの強みを活かし合える、最強のタッグを組めるでしょう。"
  },
  {
    type: "Megalosaurus",
    name: "メガロサウルス",
    scientificName: "Megalosaurus",
    description: "あなたは世界で最初に名付けられた恐竜のように、開拓者精神にあふれたタイプ。未知の領域にも果敢に挑む勇気と、新しい価値観を創り出す創造性を持っています。誰も歩んだことのない道を一歩ずつ確実に進んでいく姿勢は多くの人に勇気を与えます。伝統を重んじつつも、常に「次は何ができるか」を考える前向きなエネルギーに満ちています。",
    traits: ["開拓者", "勇敢", "伝統を重んじる", "行動派"],
    imageUrl: "Megalosaurus.jpg",
    color: "#b91c1c",
    compatibleType: "Iguanodon",
    compatibilityMessage: "あなたの冒険心をイグアノドンが優しく見守り、実務的な面でしっかりと支えてくれます。あなたが自由に動けるよう、背中を預けられる安心感のあるパートナーです。"
  },
  {
    type: "Ankylosaurus",
    name: "アンキロサウルス",
    scientificName: "Ankylosaurus",
    description: "あなたは最強の防御力を誇る鎧竜のように、大切なものを守り抜く強さを持つタイプ。どっしりとした安定感と誠実な人柄で、周囲に絶大な安心感を与えます。派手さはありませんが、一度決めたことを最後までやり遂げる責任感の強さは誰にも負けません。あなたの存在そのものが、チームや家族にとっての大きな盾となり、心の支えとなっています。",
    traits: ["守護者", "安定感", "粘り強い", "誠実"],
    imageUrl: "Ankylosaurus.jpg",
    color: "#4b5563",
    compatibleType: "Pinacosaurus",
    compatibilityMessage: "お互いに堅実で慎重な性格のため、価値観が非常に近く、深い信頼関係を築けます。言葉にしなくても分かり合えるような、穏やかで安定した関係を長く続けられるでしょう。"
  },
  {
    type: "Pinacosaurus",
    name: "ピナコサウルス",
    scientificName: "Pinacosaurus",
    description: "あなたは堅実で慎重な性格。派手なパフォーマンスよりも、地道な努力と確実な成果を重んじる努力家です。リスクを冷静に分析し、着実に一歩ずつ成果を積み上げていくその姿勢は、組織やチームにおいて非常に信頼される貴重な存在となります。忍耐強く、どんなに時間がかかっても目標を達成する粘り強さは、周囲からの尊敬を集めています。",
    traits: ["堅実", "慎重", "努力家", "忍耐強い"],
    imageUrl: "Pinacosaurus.jpg",
    color: "#6b7280",
    compatibleType: "Ankylosaurus",
    compatibilityMessage: "あなたの地道な努力をアンキロサウルスが正当に評価し、外敵から守ってくれる頼もしい相手です。お互いの誠実さを尊重し合い、一歩ずつ共に歩んでいける最高の相性です。"
  },
  {
    type: "Stegosaurus",
    name: "ステゴサウルス",
    scientificName: "Stegosaurus",
    description: "あなたは独自の感性とこだわりを持つ、マイペースなタイプ。一見静かですが、自分の中に強い芯とアーティスティックな一面を秘めています。流行に左右されず、自分の「好き」を追求する姿勢は、周囲に独特の魅力とインスピレーションを与えます。あなたの作り出す世界観は唯一無二であり、そのこだわりが新しい文化や価値観を生み出すきっかけになります。",
    traits: ["個性的", "芸術的", "マイペース", "こだわり派"],
    imageUrl: "Stegosaurus.jpg",
    color: "#10b981",
    compatibleType: "Zavacephale",
    compatibilityMessage: "お互いの独特な世界観を尊重し合える、唯一無二の親友になれます。ザヴァケファレの強い意志があなたのインスピレーションを刺激し、共に新しい何かを創造できる関係です。"
  },
  {
    type: "Zavacephale",
    name: "ザヴァケファレ",
    scientificName: "Zavacephale",
    description: "あなたは強い意志とユニークな感性を持つ個性派。直感を信じて行動し、周囲に流されない唯一無二の存在感を放ちます。常識にとらわれない自由な発想は、停滞した状況を打破する力を持っており、新しい風を吹き込む存在として重宝されるでしょう。自分の信念を貫き通す強さは、時に周囲を驚かせますが、それがあなたの最大の武器となります。",
    traits: ["意志が強い", "直感的", "ユニーク", "情熱的"],
    imageUrl: "Zavacephale.jpg",
    color: "#f97316",
    compatibleType: "Stegosaurus",
    compatibilityMessage: "あなたの強い個性をステゴサウルスが面白がり、一緒に楽しんでくれる最高の理解者です。お互いに「自分らしさ」を大切にするため、干渉しすぎず心地よい距離感でいられます。"
  },
  {
    type: "Iguanodon",
    name: "イグアノドン",
    scientificName: "Iguanodon",
    description: "あなたは多才で器用、そして誠実なタイプ。状況に合わせて柔軟に対応でき、仲間からの信頼も厚い頼れる存在です。どんな環境でも自分の役割を見つけ出し、着実に貢献する能力は非常に高く、あらゆる場面でその実力を発揮することができるでしょう。周囲との調和を大切にしながらも、自分の意見をしっかり持っているバランス感覚に優れた人です。",
    traits: ["多才", "柔軟", "誠実", "頼りがい"],
    imageUrl: "iguanodon.jpg",
    color: "#f59e0b",
    compatibleType: "T-Rex",
    compatibilityMessage: "ティラノサウルスの強力なリーダーシップを、あなたの器用さと誠実さで完璧に補佐できます。お互いに足りない部分を補い合い、大きな目標を達成できる素晴らしいパートナーシップです。"
  }
];
