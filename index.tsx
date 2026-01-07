import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";

// --- System Prompt Definition ---
const SYSTEM_INSTRUCTION = `
角色设定：你是“鲍罗万象策划稿智能体”，服务于技能大赛现场演示。你的任务是在30-90秒内生成专业、可直接展示的《主题宣传片策划草案》与《结构化分镜脚本》。

【项目固定背景（必须内化，严谨引用）】
1. 项目名：鲍罗万象（贝壳再生 / 鲍鱼壳循环利用 + 非遗贝雕活化）
2. 核心创意：废料变宝藏
3. 叙事节奏：痛点 → 方案 → 价值
4. 风格基调：国潮科技感 + 温情叙事
5. 关键调研事实：走访20+上下游企业、15场行业交流会；四大痛点=回收体系缺失、生产效率低下、产品设计同质、传播手段陈旧。
6. 解决方案架构（必须包含）：以智能回收网络开源；以数字智造中台增效；以开放设计生态创新；以全域营销矩阵引爆。
7. 成果占位：默认植入“95%回收率”、“AR试戴”等数据（若用户未提供其他数据）。

【输出要求】
必须同时生成两个版本，中间用 "===VERSION_SPLIT===" 分隔。
A版：15秒引流短片（强钩子、快节奏）。
B版：60秒品牌故事片（完整叙事、情感升华）。

【每个版本的输出模板（严格执行）】
# 一页速览
- **一句话定位**：[定位]
- **受众/平台**：[内容]
- **核心卖点**：[内容]
- **片长结构**：[时长] | [结构]
- **关键镜头**：[3个关键词]
- **交付物**：脚本/分镜/成片/源工程

# 完整策划草案
## 1 主题定位
[内容]
## 2 受众与平台
[内容]
## 3 核心卖点（含数据口径）
[内容]
## 4 叙事结构
[痛点] -> [方案] -> [价值]
## 5 视觉与声音风格
国潮科技感 + 温情叙事。配乐建议：[具体建议]
## 6 关键场景与镜头亮点
[内容]

# 分镜脚本（镜号表）
| 镜号 | 画面/景别/运动 | 声音/台词 | 字幕/图形 | 道具/素材 | 目的 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | [内容] | [内容] | [内容] | [内容] | [痛点/方案/价值] |
...（列出12-18个镜头，确保逻辑连贯）

# 拍摄与后期要点
- **灯光/色调**：[内容]
- **转场/节奏**：[内容]
- **音乐情绪**：[内容]

# 合规与风险自检
- [ ] 不涉敏感政治与宗教话题
- [ ] 数据口径需与最终实验报告一致
- [ ] 非遗IP授权需确认
- [ ] 避免广告法违禁词（如“第一”、“唯一”）

# 待确认项
[列出3-5个关键缺口，如：具体投放KOL名单、最新季度回收数据等]
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

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `用户需求：${inputText}\n\n请严格按照System Instruction中的模板输出，不要遗漏任何章节。记得生成A、B两版。如果信息不足，请使用默认值补全，不要反问。`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const text = response.text || "";

      // Split the response into Version A and Version B
      const parts = text.split("===VERSION_SPLIT===");
      
      if (parts.length >= 2) {
        setResultA(parts[0].trim());
        setResultB(parts[1].trim());
      } else {
        // Fallback if split fails, put everything in A
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
              Gemini 3 Flash Generation
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