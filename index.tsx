import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
// import { GoogleGenAI } from "@google/genai"; // Offline mode: API removed
import ReactMarkdown from "react-markdown";

// --- Mock Data Definition (Offline Mode) ---
const MOCK_GENERATED_CONTENT = `
# 一页速览
- **一句话定位**：废弃贝壳的赛博朋克新生
- **受众/平台**：抖音/小红书，Z世代国潮爱好者
- **核心卖点**：0成本原料变身千元潮品
- **片长结构**：15秒 | 强反差卡点剪辑
- **关键镜头**：贝壳山崩塌、激光雕刻特写、AR虚拟试戴
- **交付物**：分镜脚本

# 完整策划草案
## 1 主题定位
“垃圾堆里的艺术革命”，通过极速视觉反差，展示贝壳从废料到非遗潮品的蜕变。

## 2 受众与平台
抖音、快手短视频平台，针对关注环保、国潮、黑科技的年轻群体。

## 3 核心卖点
- 废料变宝藏（极致反差）
- 95%回收率（硬核数据）
- AR试戴（科技体验）

## 4 叙事结构
[痛点] 满地贝壳垃圾 -> [方案] 智能重塑过程 -> [价值] 绝美成品展示

## 5 视觉与声音风格
赛博朋克霓虹色调 + 快节奏电子鼓点（Cyberpunk/Glitch Art）。

## 6 关键场景与镜头亮点
特写贝壳破碎的瞬间，衔接激光雕刻的火花，最后定格在模特佩戴的炫酷画面。

# 分镜脚本（镜号表）
| 镜号 | 画面/景别/运动 | 声音/台词 | 字幕/图形 | 道具/素材 | 目的 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | [特写/快切] 堆积如山的废弃鲍鱼壳，灰暗压抑，镜头急速推近 | 沉重低音轰鸣 | 字幕：垃圾？ | 废弃贝壳堆 | 痛点：展示环境压力 |
| 2 | [全景/延时] 智能回收车驶入，机械臂快速抓取，画面闪烁故障风 | 电子故障音效 (Glitch) | 字幕：资源！ | 智能回收车 | 方案：智能化介入 |
| 3 | [微距/慢放] 清洗后的贝壳在传输带上闪着珍珠光泽，激光束瞬间雕刻出纹路 | 激光烧蚀声 + 节奏鼓点起 | 字幕：重塑 | 自动化流水线 | 方案：智造工艺 |
| 4 | [中景/环绕] 3D打印机喷头在贝壳表面堆叠材料，生成复杂几何结构 | 科技感合成音 | 数据：效率+300% | 3D打印机 | 方案：技术赋能 |
| 5 | [特写/定格] 模特佩戴贝雕耳机壳，手指划过，AR界面浮现参数 | 清脆的提示音 | 字幕：AR试戴 | 成品、AR特效 | 价值：产品体验 |
| 6 | [近景/跟随] 手机屏幕中，用户通过APP扫描贝壳，虚拟生成定制饰品 | 节奏加快 | 字幕：你的专属 | 手机APP界面 | 价值：交互创新 |
| 7 | [全景/推拉] 镜头拉开，无数贝壳汇聚成“鲍罗万象”Logo，霓虹光效炸裂 | 重音收尾 | Logo：鲍罗万象 | 粒子特效 | 品牌：强化记忆 |

# 拍摄与后期要点
- **灯光/色调**：高饱和度，蓝紫撞色，强调科技感。
- **转场/节奏**：每一帧都踩在鼓点上，使用变焦转场（Zoom In/Out）。
- **音乐情绪**：强劲的工业电子乐，带有金属质感。

# 合规与风险自检
- [x] 不涉敏感政治与宗教话题
- [x] 数据口径需与最终实验报告一致
- [x] 非遗IP授权需确认
- [x] 避免广告法违禁词

# 待确认项
- 需确认AR试戴APP的录屏素材是否就位。
- 确认背景音乐版权购买情况。

===VERSION_SPLIT===

# 一页速览
- **一句话定位**：从海边废墟到国潮殿堂的温情科技叙事
- **受众/平台**：B站/企业官网/展厅，政府领导、投资人、合作伙伴
- **核心卖点**：全产业链闭环 + 非遗文化传承 + 乡村振兴价值
- **片长结构**：60秒 | 情感引入 -> 技术拆解 -> 价值升华
- **关键镜头**：老工匠的手与机械臂同框、村民笑脸、数字大屏数据跳动
- **交付物**：完整品牌故事片脚本

# 完整策划草案
## 1 主题定位
“不仅是再生，更是新生”。讲述科技如何不仅解决了污染，更让传统非遗技艺在数字时代找到新的生存土壤。

## 2 受众与平台
大赛评委、政府视察领导、产业投资人。投放于路演现场及展厅大屏。

## 3 核心卖点（含数据口径）
- **智能回收网络**：覆盖20+上下游企业。
- **数字智造中台**：生产效率提升300%。
- **95%回收率**：解决环保痛点。
- **非遗活化**：让贝雕技艺走进日常生活。

## 4 叙事结构
[痛点] 曾经的污染之痛 -> [方案] 鲍罗万象的数字化解法 -> [价值] 生态与文化的双重丰收

## 5 视觉与声音风格
前段写实纪录片质感（冷色调），中段高精科技感（蓝白色调），后段温暖人文感（暖色调）。配乐由大提琴独奏过渡到宏大交响乐。

## 6 关键场景与镜头亮点
老手艺人抚摸贝壳的特写与自动化机械臂雕刻的画面通过叠化剪辑在一起，象征传承与创新的融合。

# 分镜脚本（镜号表）
| 镜号 | 画面/景别/运动 | 声音/台词 | 字幕/图形 | 道具/素材 | 目的 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | [远景/固定] 阴雨天的海边渔村，成吨的废弃贝壳堆积如山，甚至阻塞了道路 | 海浪声夹杂着嘈杂风声，沉闷钢琴 | 字幕：曾经，这是负担 | 渔村实景 | 痛点：环境污染 |
| 2 | [中景/摇摄] 渔民老张看着废料堆叹气，拿起一枚贝壳无奈摇头的背影 | 旁白：千万吨废弃贝壳，是生态的伤痕，还是错放的宝藏？ | 无 | 渔民演员 | 痛点：产业困境 |
| 3 | [特写/跟拍] 一只年轻的手捡起贝壳，镜头上摇，是“鲍罗万象”团队坚定的眼神 | 音乐转折，加入弦乐律动 | 字幕：鲍罗万象 | 团队成员 | 转折：团队入场 |
| 4 | [全景/航拍] 智能回收车穿梭在村落，构建出的数字化网络线条覆盖地图 | 旁白：我们构建智能回收网络，让每一枚贝壳都有迹可循。 | 图形：回收点位图 | 动态地图特效 | 方案：回收体系 |
| 5 | [中景/平移] 工厂内部，自动化清洗线高速运转，污水经过处理变清澈 | 机械运转声，轻快节奏 | 字幕：95% 回收利用率 | 污水处理设备 | 方案：绿色生产 |
| 6 | [微距/特写] 激光探头扫描贝壳曲面，生成三维点云模型，数据在屏幕飞速跳动 | 科技感扫描音效 | 图形：3D模型构建中 | 电脑屏幕 | 方案：数字智造 |
| 7 | [特写/对比] 左边是老艺人手握刻刀精雕细琢，右边是机械臂精准复刻纹理，分屏显示 | 旁白：数字智造中台，让非遗技艺不再难以复制。 | 字幕：效率提升300% | 刻刀、机械臂 | 方案：非遗赋能 |
| 8 | [近景/展示] 精美的贝雕手机壳、饰品、灯具在展厅灯光下流光溢彩 | 音乐进入高潮，宏大交响 | 字幕：万物皆可“鲍” | 各类成品 | 价值：产品落地 |
| 9 | [中景/抓拍] 渔民老张收到分红，笑得合不拢嘴；年轻设计师在电脑前自信讲解 | 欢笑声，快门声 | 字幕：生态致富 | 现金、设计稿 | 价值：社会效益 |
| 10 | [特写/AR演示] 用户戴着智能眼镜，看到贝雕饰品不仅是实物，还有虚拟特效环绕 | 旁白：开放生态，链接未来。 | 图形：AR界面 | 智能眼镜 | 价值：未来展望 |
| 11 | [全景/升格] 团队在海边奔跑，阳光洒在干净的沙滩上，天空中浮现项目Logo | 旁白：鲍罗万象，让废料变宝藏，让非遗见未来。 | Logo：鲍罗万象 | 海滩空镜 | 结尾：愿景升华 |

# 拍摄与后期要点
- **灯光/色调**：从开头的低饱和度冷灰，过渡到中间的科技蓝，最后是温暖的夕阳金。
- **转场/节奏**：前半段舒缓沉重，中段快速利落，后段大气磅礴。
- **音乐情绪**：层层递进，注重情感共鸣。

# 合规与风险自检
- [x] 确保村民肖像权已获授权
- [x] 工厂拍摄需佩戴安全帽，符合安全生产规范
- [x] 数据引用需标注来源（2023年度运营报表）
- [x] 避免过度承诺收益

# 待确认项
- 需协调老手艺人的拍摄档期。
- 确认展厅大屏的最终分辨率以匹配视频输出。
`;

// --- Interactive Storyboard Component ---
interface Shot {
  id: string;
  visual: string;
  audio: string;
  subtitle: string;
  props: string;
  purpose: string;
}

const StoryboardVisualizer = ({ markdown }: { markdown: string }) => {
  const [shots, setShots] = useState<Shot[]>([]);
  const [selectedShot, setSelectedShot] = useState<Shot | null>(null);
  
  // Drag Scroll State
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    try {
        const lines = markdown.split('\n');
        const extracted: Shot[] = [];
        let capturing = false;
        
        for (let line of lines) {
            line = line.trim();
            if (line.includes('| 镜号 |')) {
                capturing = true;
                continue;
            }
            if (capturing) {
                if (line.includes('---')) continue;
                if (extracted.length > 0 && (line === '' || line.startsWith('#'))) {
                    break;
                }
                if (!line.startsWith('|')) continue;
                
                const parts = line.split('|').map(s => s.trim()).filter(s => s !== '');
                if (parts.length >= 6) {
                     extracted.push({
                        id: parts[0],
                        visual: parts[1],
                        audio: parts[2],
                        subtitle: parts[3],
                        props: parts[4],
                        purpose: parts[5]
                    });
                }
            }
        }
        setShots(extracted);
    } catch (e) {
        console.error("Storyboard parse error", e);
    }
  }, [markdown]);

  // Mouse Handlers for Drag Scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDown.current = true;
    isDragging.current = false;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    if (!sliderRef.current) return;
    isDown.current = false;
    sliderRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;
    isDown.current = false;
    sliderRef.current.style.cursor = 'grab';
    // Small delay to prevent click event from firing immediately if it was a drag
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll-fast
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
    
    // Determine if it's a drag or a click
    if (Math.abs(walk) > 5) {
      isDragging.current = true;
    }
  };

  const handleItemClick = (shot: Shot) => {
    if (isDragging.current) return;
    setSelectedShot(shot);
  };

  if (shots.length === 0) return null;

  return (
    <div style={{ marginBottom: '40px', position: 'relative', zIndex: 2 }}>
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: '20px', 
          color: 'var(--text-primary)', 
          fontSize: '1rem', 
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px' 
        }}>
          <span style={{ display:'inline-block', width:'4px', height:'16px', background:'var(--accent-gold)'}}></span>
          分镜交互预览
        </h3>
        
        {/* Horizontal Scroll Container */}
        <div 
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: '20px', 
            paddingBottom: '24px',
            paddingLeft: '4px',
            cursor: 'grab',
            userSelect: 'none' // Prevent text selection while dragging
          }}
        >
            {shots.map((shot, idx) => (
                <div 
                    key={idx}
                    onClick={() => handleItemClick(shot)}
                    style={{
                        minWidth: '240px',
                        maxWidth: '240px',
                        height: '180px',
                        background: selectedShot?.id === shot.id ? '#fffcf5' : '#ffffff',
                        border: selectedShot?.id === shot.id ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '20px',
                        // Remove generic cursor pointer to avoid confusion with grab, set in CSS logic if needed
                        cursor: 'pointer', 
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        boxShadow: selectedShot?.id === shot.id 
                          ? '0 12px 24px -8px rgba(191, 161, 95, 0.3)' 
                          : '0 4px 6px -1px rgba(0,0,0,0.02)',
                        flexShrink: 0,
                        position: 'relative',
                        justifyContent: 'space-between'
                    }}
                    onMouseOver={e => { 
                      if (selectedShot?.id !== shot.id) {
                        e.currentTarget.style.transform = 'translateY(-4px)'; 
                        e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0, 0, 0, 0.05)'; 
                      }
                    }}
                    onMouseOut={e => { 
                      if (selectedShot?.id !== shot.id) {
                        e.currentTarget.style.transform = 'translateY(0)'; 
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.02)'; 
                      }
                    }}
                >
                    <div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '12px'
                      }}>
                        <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '600', letterSpacing: '0.05em' }}>SCENE</span>
                        <span style={{ 
                          fontSize: '1rem', 
                          color: selectedShot?.id === shot.id ? 'var(--accent-gold)' : 'var(--text-primary)', 
                          fontWeight: '700',
                          fontFamily: 'monospace' 
                        }}>{shot.id.padStart(2, '0')}</span>
                      </div>
                      <div style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--text-primary)', 
                        lineHeight: '1.6',
                        overflow: 'hidden', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 3, 
                        WebkitBoxOrient: 'vertical',
                        fontWeight: '500'
                      }}>
                          {shot.visual}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--text-secondary)',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '10px',
                      marginTop: '10px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {shot.audio || "无对白"}
                    </div>
                </div>
            ))}
        </div>

        {/* Detail View */}
        {selectedShot && (
            <div style={{
                marginTop: '10px',
                padding: '32px',
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '16px',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
                animation: 'fadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                      <strong style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', fontFamily: 'monospace' }}>SCENE {selectedShot.id}</strong>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>详细脚本参数</span>
                    </div>
                    <button 
                      onClick={() => setSelectedShot(null)} 
                      style={{ 
                        border: 'none', 
                        background: 'transparent', 
                        cursor: 'pointer', 
                        fontSize: '1.5rem', 
                        color: 'var(--text-secondary)',
                        padding: '8px',
                        transition: 'color 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    >&times;</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', fontSize: '0.95rem' }}>
                    <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '12px' }}>
                        <strong style={{ display:'block', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>画面 Visual</strong>
                        <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.6 }}>{selectedShot.visual}</p>
                    </div>
                    <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '12px' }}>
                        <strong style={{ display:'block', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>声音 Audio</strong>
                        <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.6 }}>{selectedShot.audio}</p>
                    </div>
                     <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '12px' }}>
                        <strong style={{ display:'block', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>图形 GFX</strong>
                        <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.6 }}>{selectedShot.subtitle}</p>
                    </div>
                    <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '12px' }}>
                        <strong style={{ display:'block', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>意图 Goal</strong>
                        <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.6 }}>{selectedShot.purpose}</p>
                    </div>
                     <div style={{ gridColumn: '1 / -1', background: '#fffcf5', padding: '20px', borderRadius: '12px', border: '1px dashed var(--accent-gold)' }}>
                        <strong style={{ display:'block', color: 'var(--accent-gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>道具 Props & Assets</strong>
                        <p style={{ margin: 0, color: '#451a03', fontWeight: 500 }}>{selectedShot.props}</p>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

// --- Loading Component ---
const LoadingView = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "解析核心需求 (Analyzing Request)...",
    "构建叙事结构 (Building Narrative)...",
    "生成分镜画面 (Drafting Shots)...",
    "优化关键参数 (Optimizing Parameters)...",
    "最终渲染 (Finalizing)..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000); // Change step every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      animation: 'fadeIn 0.5s ease',
      color: '#374151'
    }}>
      {/* Dynamic Hex Tech Loader */}
      <div className="hex-loader-container">
        <div className="hex-layer hex-1"></div>
        <div className="hex-layer hex-2"></div>
        <div className="hex-layer hex-3"></div>
        <div className="hex-core"></div>
        <div className="hex-particles">
            {[...Array(4)].map((_, i) => <div key={i} className={`h-particle hp-${i}`}></div>)}
        </div>
      </div>

      {/* Steps Display with progress bar effect */}
      <div style={{ textAlign: 'center', marginTop: '40px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          fontSize: '1.2rem', 
          fontWeight: '700', 
          marginBottom: '12px',
          height: '28px',
          background: 'linear-gradient(to right, var(--accent-gold), var(--accent-teal))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          {steps[step]}
        </div>
        
        {/* Progress Dots */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          justifyContent: 'center',
          marginTop: '16px'
        }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: i === step ? '24px' : '6px',
              height: '6px',
              borderRadius: '100px',
              background: i <= step ? 'var(--accent-gold)' : '#e5e7eb',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />
          ))}
        </div>
      </div>
      
      <style>{`
        .hex-loader-container {
            position: relative;
            width: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .hex-layer {
            position: absolute;
            border-radius: 50%;
            border: 2px solid transparent;
        }

        /* Outer Ring */
        .hex-1 {
            width: 100%;
            height: 100%;
            border-top-color: var(--text-secondary);
            border-bottom-color: transparent;
            border-left-color: var(--text-secondary);
            border-right-color: transparent;
            opacity: 0.1;
            animation: spin 3s linear infinite;
        }

        /* Middle Ring - Teal */
        .hex-2 {
            width: 80%;
            height: 80%;
            border-width: 3px;
            border-top-color: var(--accent-teal);
            border-right-color: transparent;
            border-bottom-color: var(--accent-teal);
            border-left-color: transparent;
            opacity: 0.6;
            animation: spin 2s linear infinite reverse;
        }

        /* Inner Ring - Gold */
        .hex-3 {
            width: 60%;
            height: 60%;
            border-width: 4px;
            border-top-color: var(--accent-gold);
            border-right-color: transparent;
            border-bottom-color: transparent;
            border-left-color: transparent;
            animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
        }

        /* Core */
        .hex-core {
            width: 20px;
            height: 20px;
            background: var(--text-primary);
            border-radius: 50%;
            animation: pulse-core 1s ease-in-out infinite alternate;
            box-shadow: 0 0 20px rgba(191, 161, 95, 0.5);
        }

        .h-particle {
            position: absolute;
            width: 8px;
            height: 8px;
            background: var(--accent-gold);
            border-radius: 50%;
            top: 50%;
            left: 50%;
        }

        .hp-0 { animation: orbit-1 2s linear infinite; }
        .hp-1 { animation: orbit-2 3s linear infinite; background: var(--accent-teal); }
        .hp-2 { animation: orbit-1 2.5s linear infinite reverse; opacity: 0.5; }
        .hp-3 { animation: zoom-fade 1s ease-out infinite; }

        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        @keyframes pulse-core {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(1.5); opacity: 1; box-shadow: 0 0 30px rgba(13, 148, 136, 0.6); }
        }

        @keyframes orbit-1 {
            0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }

        @keyframes orbit-2 {
            0% { transform: rotate(180deg) translateX(55px) rotate(-180deg); }
            100% { transform: rotate(540deg) translateX(55px) rotate(-540deg); }
        }
        
        @keyframes zoom-fade {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultA, setResultA] = useState("");
  const [resultB, setResultB] = useState("");
  const [activeTab, setActiveTab] = useState<"A" | "B">("A");
  const [error, setError] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  
  // Scroll Position for Parallax
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleMainScroll = () => {
    if (mainRef.current) {
      setScrollY(mainRef.current.scrollTop);
    }
  };

  const suggestions = [
    "面向抖音年轻群体，想推广我们的‘国潮手机壳’，突出非遗工艺结合。",
    "针对政府评委，展示产业扶贫价值，重点讲回收体系的智能化。",
    "双11预热短片，强调‘废料变宝藏’的环保概念，风格要非常酷炫。",
    "为‘鲍罗万象’制作一支15秒抖音挑战赛示范片，强调变废为宝的DIY过程。",
    "面向设计类学生的招募视频，展示非遗贝雕的现代美学，风格要极简高冷。",
    "给合作伙伴看的工厂实拍剪辑脚本，重点展示自动化清洗和分拣流水线。",
    "制作一支投放在电梯屏的洗脑广告，强调‘鲍鱼壳能做护肤品’的科技点。",
    "针对环保公益展的沉浸式视频，无需旁白，纯画面与音效展示生态循环。",
    "面向B端客户的企业宣传片，30秒展示‘回收-处理-再造-销售’全链路。"
  ];

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError("");
    setResultA("");
    setResultB("");

    // OFFLINE MODE SIMULATION
    // Simulate AI processing time to match the LoadingView animations (approx 10 seconds for full cycle)
    setTimeout(() => {
        try {
            const text = MOCK_GENERATED_CONTENT;
            // Split the response into Version A and Version B
            const parts = text.split("===VERSION_SPLIT===");
            
            if (parts.length >= 2) {
              setResultA(parts[0].trim());
              setResultB(parts[1].trim());
            } else {
              setResultA(text);
              setResultB("生成格式异常，请查看完整内容。");
            }
            setHasGenerated(true);
        } catch (err) {
            console.error(err);
            setError("生成失败，请检查网络或重试。");
        } finally {
            setLoading(false);
        }
    }, 8000); // 8 seconds delay to let animations play out comfortably
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("已复制到剪贴板！");
  };

  // --- Render Logic ---

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: hasGenerated ? "#f8f9fa" : "#fafafa",
      fontFamily: "'Inter', sans-serif",
      color: "var(--text-primary)",
      transition: "background 0.5s ease"
    }}>
      
      {/* 
        LAYOUT STATE 1: HERO (INITIAL) 
        Centered, large input, focus on starting the task.
      */}
      {!hasGenerated && (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 20px", display: "flex", flexDirection: "column", minHeight: "80vh", justifyContent: "center" }}>
          <header style={{ marginBottom: "50px", textAlign: "center", animation: "fadeIn 0.8s ease" }}>
            <h1 style={{ 
              margin: "0 0 16px 0", 
              fontSize: "3.5rem", 
              color: "#111827", 
              letterSpacing: "-0.04em",
              fontWeight: 800
            }}>
              鲍罗万象 | 策划智能体
            </h1>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "1.1rem", fontWeight: 400 }}>
              Gemini 3 Flash 驱动 • 职业级视频策划生成
            </p>
          </header>

          <div style={{ 
            background: "#ffffff", 
            padding: "40px", 
            borderRadius: "24px", 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0,0,0,0.03)",
            animation: "slideUp 0.6s ease",
            minHeight: "400px", /* Fixed height to prevent layout jump when switching to loading */
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
             {loading ? (
                <LoadingView />
             ) : (
               <>
                <div>
                  <label style={{ display: "block", marginBottom: "16px", fontWeight: "600", color: "#374151", fontSize: "1rem" }}>
                    输入您的策划需求
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="例如：我们需要一个面向投资人的60秒宣传片，重点强调‘数字智造中台’如何解决生产效率低下的痛点..."
                    style={{
                      width: "100%",
                      height: "160px",
                      padding: "20px",
                      background: "#f9fafb",
                      border: "2px solid transparent",
                      borderRadius: "16px",
                      color: "#1f2937",
                      fontSize: "1.1rem",
                      fontFamily: "inherit",
                      resize: "none",
                      outline: "none",
                      transition: "all 0.2s",
                      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
                    }}
                    onFocus={(e) => {
                      e.target.style.background = "#fff";
                      e.target.style.borderColor = "var(--accent-gold)";
                      e.target.style.boxShadow = "0 0 0 4px rgba(191, 161, 95, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.background = "#f9fafb";
                      e.target.style.borderColor = "transparent";
                      e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)";
                    }}
                  />
                  
                  {/* Expanded Suggestions */}
                  <div style={{ marginTop: "24px", display: "flex", gap: "10px", flexWrap: "wrap", maxHeight: '120px', overflowY: 'auto', paddingRight: '5px' }}>
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setInputText(s)}
                        style={{
                          background: "#ffffff",
                          border: "1px solid #e5e7eb",
                          color: "#6b7280",
                          padding: "8px 16px",
                          borderRadius: "100px",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          fontWeight: "500",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = "#d1d5db";
                          e.currentTarget.style.color = "#111827";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                          e.currentTarget.style.color = "#6b7280";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={handleGenerate}
                    disabled={!inputText}
                    style={{
                      background: "#111827",
                      color: "#ffffff",
                      border: "none",
                      padding: "16px 48px",
                      borderRadius: "14px",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    立即生成方案
                    <span>✨</span>
                  </button>
                </div>
               </>
             )}
          </div>
          {error && <div style={{marginTop: '20px', color: 'tomato', textAlign: 'center'}}>{error}</div>}
        </div>
      )}

      {/* 
        LAYOUT STATE 2: DASHBOARD (SPLIT SCREEN)
        Left: Inputs & Controls. Right: Content.
      */}
      {hasGenerated && (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
          
          {/* LEFT SIDEBAR: Controls & Navigation */}
          <aside style={{ 
            width: '400px', 
            background: '#ffffff', 
            borderRight: '1px solid #e5e7eb', 
            display: 'flex', 
            flexDirection: 'column',
            zIndex: 10,
            boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
          }}>
            <div style={{ padding: '30px', borderBottom: '1px solid #f3f4f6' }}>
               <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#111827', fontWeight: 800, letterSpacing: '-0.02em' }}>
                鲍罗万象
               </h1>
               <p style={{ margin: '4px 0 0 0', color: '#9ca3af', fontSize: '0.85rem' }}>策划智能体</p>
            </div>

            <div style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
               {/* Loading Overlay in Sidebar during Regeneration */}
               {loading ? (
                 <div style={{ padding: '40px 0' }}>
                   <LoadingView />
                 </div>
               ) : (
                 <>
                  <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    当前需求
                  </label>
                  <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      style={{
                        width: '100%',
                        height: '120px',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        background: '#f9fafb',
                        fontSize: '0.9rem',
                        resize: 'none',
                        marginBottom: '15px'
                      }}
                  />
                  <button
                      onClick={handleGenerate}
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        color: '#374151',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => (e.currentTarget.style.borderColor = '#9ca3af')}
                      onMouseOut={e => (e.currentTarget.style.borderColor = '#d1d5db')}
                  >
                    Regenerate 更新生成
                  </button>

                  <div style={{ marginTop: '40px' }}>
                    <label style={{ display: 'block', marginBottom: '15px', fontSize: '0.85rem', fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      方案版本
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button
                          onClick={() => setActiveTab("A")}
                          style={{
                            padding: '16px',
                            textAlign: 'left',
                            background: activeTab === 'A' ? '#fffcf5' : '#ffffff',
                            border: activeTab === 'A' ? '1px solid var(--accent-gold)' : '1px solid #e5e7eb',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            position: 'relative',
                            boxShadow: activeTab === 'A' ? '0 4px 6px -1px rgba(191, 161, 95, 0.1)' : 'none'
                          }}
                        >
                          <div style={{ fontWeight: 700, color: '#111827', marginBottom: '4px' }}>版本 A: 15s 引流短片</div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>快节奏 · 强钩子 · 社交媒体</div>
                          {activeTab === 'A' && <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }}>●</div>}
                        </button>
                        <button
                          onClick={() => setActiveTab("B")}
                          style={{
                            padding: '16px',
                            textAlign: 'left',
                            background: activeTab === 'B' ? '#fffcf5' : '#ffffff',
                            border: activeTab === 'B' ? '1px solid var(--accent-gold)' : '1px solid #e5e7eb',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            position: 'relative',
                            boxShadow: activeTab === 'B' ? '0 4px 6px -1px rgba(191, 161, 95, 0.1)' : 'none'
                          }}
                        >
                          <div style={{ fontWeight: 700, color: '#111827', marginBottom: '4px' }}>版本 B: 60s 品牌故事</div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>完整叙事 · 情感升华 · 官方展示</div>
                          {activeTab === 'B' && <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-gold)' }}>●</div>}
                        </button>
                    </div>
                  </div>
                 </>
               )}
            </div>
            
            <div style={{ padding: '20px', borderTop: '1px solid #f3f4f6', fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center' }}>
              Gemini 3 Flash Generation (Demo Mode)
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT: Visualizer & Text */}
          <main 
            ref={mainRef}
            onScroll={handleMainScroll}
            style={{ 
              flex: 1, 
              background: '#fafafa', 
              overflowY: 'auto', 
              position: 'relative',
              padding: '60px 80px'
            }}
          >
            {/* Parallax Background Layers */}
            <div 
              className="parallax-layer"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
                background: 'radial-gradient(circle at 80% 20%, rgba(191, 161, 95, 0.08) 0%, transparent 25%)'
              }}
            />
            <div 
              className="parallax-layer"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                background: 'radial-gradient(circle at 10% 50%, rgba(13, 148, 136, 0.05) 0%, transparent 30%)'
              }}
            />
            <div 
               className="parallax-layer"
               style={{
                 transform: `translateY(${scrollY * 0.05}px)`,
                 background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
               }}
            />

            <button
                onClick={() => copyToClipboard(activeTab === "A" ? resultA : resultB)}
                style={{
                  position: "fixed",
                  top: "30px",
                  right: "40px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  color: "#374151",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                  zIndex: 20
                }}
                onMouseOver={(e) => {
                   e.currentTarget.style.transform = "translateY(-1px)";
                   e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                   e.currentTarget.style.transform = "translateY(0)";
                   e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)";
                }}
              >
                Copy to Clipboard 全文复制
              </button>

            <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
              
              {/* Storyboard Visualizer Section */}
              <section style={{ marginBottom: '60px', animation: 'fadeIn 0.5s ease' }}>
                <StoryboardVisualizer markdown={activeTab === "A" ? resultA : resultB} />
              </section>

              {/* Markdown Content Section */}
              <section 
                className="markdown-body" 
                style={{ 
                  background: '#ffffff', 
                  padding: '60px', 
                  borderRadius: '16px', 
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.02)',
                  minHeight: '600px',
                  animation: 'slideUp 0.6s ease'
                }}
              >
                 <ReactMarkdown>
                  {activeTab === "A" ? resultA : resultB}
                </ReactMarkdown>
              </section>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);