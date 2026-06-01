import {program} from 'commander';
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

program
    .name('kanjivg-convert-json')
    .description('Converts KanjiVG SVG paths into JSON')
    .version('1.0.0')
    .option('-j, --joyo', 'Only convert Joyo kanji')
    .option('-d, --default-only', 'Only convert default, non-variant forms');

program.parse();

const options = program.opts();

const JOYO_KANJI = '一右雨円王音下火花貝学気休玉金九空月犬見五口校左三山四子糸字耳七車手十出女小上森人水正生青石赤先千川早草足村大男竹中虫町天田土二日入年白八百文本名木目夕立力林六引羽雲園遠黄何夏家科歌画会回海絵外角楽活間丸岩顔帰汽記弓牛魚京強教近兄形計元原言古戸午後語交光公工広考行高合国黒今才細作算姉市思止紙寺時自室社弱首秋週春書少場色食心新親図数星晴声西切雪線船前組走多太体台谷知地池茶昼朝長鳥直通弟店点電冬刀東当答頭同道読内南肉馬買売麦半番父風分聞米歩母方北妹毎万明鳴毛門夜野矢友曜用来理里話悪安暗委意医育員飲院運泳駅央横屋温化荷界開階寒感漢館岸期起客宮急球究級去橋業局曲銀区苦具君係軽決血研県庫湖向幸港号根祭坂皿仕使始指死詩歯事持次式実写者主取守酒受州拾終習集住重宿所暑助勝商昭消章乗植深申真神身進世整昔全想相送息速族他打対待代第題炭短談着柱注丁帳調追定庭笛鉄転登都度島投湯等豆動童農波配倍箱畑発反板悲皮美鼻筆氷表病秒品負部服福物平返勉放味命面問役薬油有由遊予様洋羊葉陽落流旅両緑礼列練路和愛案以位衣井茨印栄英塩岡沖億加果課貨芽賀改械害街各覚潟完官管観関願器岐希旗機季議求泣給挙漁競共協鏡極熊訓群軍郡径景芸欠結健建験固候功好康香佐差最菜材阪崎埼昨刷察札参散産残司氏試児滋治辞鹿失借種周祝順初唱松焼照省笑城信臣成清静席積折節説戦浅選然倉巣争側束続卒孫帯隊達単置仲兆低底的典伝徒努灯働徳特栃奈縄熱念敗梅博飯飛必媛標票不付夫富府阜副兵別変辺便包法望牧末満未民無約勇要養浴利梨陸料良量輪類令例冷連労老録圧囲易移因営永衛液益演往応仮価可河過解快格確額刊幹慣眼喜基寄紀規技義逆久救旧居許境興均禁句型経潔件検険減現限個故護効厚構耕航講鉱告混査再妻採災際在罪財桜殺雑賛酸史士師志支枝資飼似示識質舎謝授修術述準序招証象賞常情条状織職制勢性政精製税績責接設絶祖素総像増造則測属損態貸団断築貯張停提程適統堂導銅得毒独任燃能破判版犯比肥費非備評貧婦布武復複仏粉編弁保墓報豊暴貿防脈務夢迷綿輸余容率略留領歴異胃遺域宇映延沿恩我灰拡閣革割株巻干看簡危揮机貴疑吸供胸郷勤筋敬系警劇激穴券憲権絹厳源呼己誤后孝皇紅鋼降刻穀骨困砂座済裁策冊蚕姿私至視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除傷将承障蒸針仁垂推寸盛聖誠舌宣専泉洗染銭善創奏層操窓装臓蔵存尊退宅担探誕暖段値宙忠著庁潮腸頂賃痛敵展党糖討届難乳認納脳派俳拝背肺班晩否批秘俵腹奮並閉陛片補暮宝訪亡忘棒枚幕密盟模訳優郵預幼欲翌乱卵覧裏律臨朗論亜哀挨握扱宛闇依偉威尉慰椅為畏維緯萎違壱逸稲芋咽姻淫陰隠韻臼渦唄浦餌影詠鋭疫悦謁越閲宴怨援炎煙猿縁艶鉛汚凹奥押旺欧殴翁憶臆乙俺卸穏佳嫁寡暇架禍稼箇苛華菓蚊牙雅餓介塊壊怪悔懐戒拐皆劾崖慨概涯蓋該骸垣柿嚇核殻獲穫較郭隔岳顎掛喝括渇滑葛褐轄且釜鎌刈瓦乾冠勘勧喚堪寛患憾換敢棺款歓汗環甘監緩缶肝艦貫還鑑閑陥韓含玩頑企伎奇幾忌既棋棄畿祈軌輝飢騎鬼亀偽儀宜戯擬欺犠菊吉喫詰却脚虐丘及朽窮糾巨拒拠虚距享凶叫峡恐恭挟況狂狭矯脅響驚仰凝暁僅巾錦斤琴緊菌襟謹吟駆駒愚虞偶遇隅串屈掘窟靴繰桑勲薫傾刑啓契恵慶憩掲携渓稽継茎蛍詣鶏迎鯨撃隙桁傑倹兼剣圏堅嫌懸拳献肩謙賢軒遣鍵顕幻弦玄舷孤弧枯股虎誇雇顧鼓互呉娯御悟碁乞侯勾喉坑孔巧恒慌抗拘控攻更梗江洪溝甲硬稿絞綱肯荒衡貢購郊酵項剛拷豪克酷獄腰込頃墾婚恨懇昆痕紺魂唆沙詐鎖挫債催塞宰彩栽歳采砕斎載剤咲削搾柵索錯拶撮擦傘惨桟斬暫伺刺嗣施旨祉紫肢脂諮賜雌侍慈璽軸執嫉湿漆疾芝赦斜煮遮蛇邪爵酌釈寂朱殊狩珠腫趣儒呪寿需囚愁秀臭舟襲蹴酬醜充柔汁渋獣銃叔淑粛塾俊瞬准循旬殉潤盾巡遵庶緒叙徐償匠升召奨宵尚床彰抄掌昇晶沼渉焦症硝礁祥称粧紹肖衝訟詔詳鐘丈冗剰壌嬢浄畳譲醸錠嘱飾拭殖触辱尻伸侵唇娠寝審慎振浸紳芯薪診辛震刃尋甚尽腎迅陣須酢吹帥炊睡粋衰遂酔随髄崇枢据杉裾澄瀬畝是凄姓征牲誓請逝醒斉隻惜戚斥析籍脊跡拙摂窃仙占扇栓潜煎旋繊羨腺薦詮践遷鮮漸禅繕膳塑措曽狙疎礎租粗訴阻遡僧双喪壮爽捜掃挿曹槽燥痩荘葬藻遭霜騒憎贈促即捉俗賊袖遜汰唾堕妥惰駄堆耐怠戴替泰滞胎袋逮滝卓択拓沢濯託濁諾但奪脱棚誰丹嘆旦淡端綻胆鍛壇弾恥痴稚致遅畜蓄逐秩窒嫡抽衷酎鋳駐弔彫徴懲挑眺聴超跳勅捗朕沈珍鎮陳津墜椎塚漬潰坪爪釣鶴亭偵貞呈堤帝廷抵締艇訂諦逓邸泥摘滴溺哲徹撤迭添貼殿吐塗妬斗渡賭途奴怒倒凍唐塔悼搭桃棟盗痘筒到藤謄踏逃透陶騰闘憧洞瞳胴峠匿督篤凸突屯豚頓曇鈍那謎鍋軟尼弐匂虹如尿妊忍寧猫捻粘悩濃把覇婆罵廃排杯輩培媒賠陪伯拍泊舶薄迫漠爆縛箸肌鉢髪伐罰抜閥伴帆搬斑氾汎畔繁般藩販範煩頒盤蛮卑妃彼扉披泌疲碑罷被避尾微眉匹膝肘姫漂描苗浜賓頻敏瓶怖扶敷普浮符腐膚譜賦赴附侮舞封伏幅覆払沸噴墳憤紛雰丙併塀幣弊柄蔽壁癖蔑偏遍舗捕穂募慕簿倣俸奉峰崩抱泡砲縫胞芳蜂褒邦飽乏傍剖坊妨帽忙房某冒紡肪膨謀貌僕墨撲朴睦勃没堀奔翻凡盆摩磨魔麻埋昧膜枕又抹繭慢漫魅岬蜜妙眠矛霧婿娘冥銘滅免麺茂妄猛盲網耗黙餅戻紋冶弥厄躍柳愉癒諭唯幽悠憂湧猶裕誘雄融与誉妖庸揚揺擁溶窯謡踊抑沃翼羅裸頼雷絡酪嵐欄濫藍吏履璃痢離硫粒隆竜侶慮虜了僚寮涼猟療瞭糧陵倫厘隣瑠塁涙累励鈴隷零霊麗齢暦劣烈裂廉恋錬呂炉賂露廊弄楼浪漏郎麓賄脇惑枠湾腕丼傲刹哺喩嗅嘲毀彙恣惧慄憬拉摯曖楷鬱璧瘍箋籠緻羞訃諧貪踪辣錮塡頰𠮟剝';
const isJoyoKanji = (kanji: string) => JOYO_KANJI.includes(kanji);

const sourceDir = path.resolve(import.meta.dirname, '../kanji');
const destDir = path.resolve(import.meta.dirname, '../kanji_json');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

const files = fs.readdirSync(sourceDir);

let count = 0;

for (const file of files) {
    // Extract the kanji codepoint from the filename by removing variants and the extension
    const kanjiCodepointHex = file.replace(/-.*/, '').replace('.svg', '');
    const kanji = String.fromCodePoint(parseInt(kanjiCodepointHex, 16));

    if (options.joyo && !isJoyoKanji(kanji)) {
        continue;   
    }
    
    const isVariant = file.includes('-');
    if (options.defaultOnly && isVariant) {
        continue;
    }

    const svgFileData = fs.readFileSync(path.resolve(sourceDir, file));
    const $ = cheerio.loadBuffer(svgFileData, {
        xml: true
    });

    // Extract all <path> elements
    const rootSvgElement = $('svg');
    const {width, height} = rootSvgElement.attr() ?? {};
    const pathElements = $('path').toArray();
    pathElements.sort((a, b) => a.attribs['id']!.localeCompare(b.attribs['id']!));
    const strokes = pathElements.map(el => el.attribs['d']!);

    const destFile = path.resolve(destDir, file.replace('.svg', '.json'));
    fs.writeFileSync(destFile, JSON.stringify({
        width,
        height,
        strokes
    }));

    count++;
}

console.log(`${count} SVGs converted`);
