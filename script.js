document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM完全加载');
    // 获取DOM元素
    const settingsBtn = document.getElementById('settingsBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const settingsDrawer = document.getElementById('settingsDrawer');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const targetDateInput = document.getElementById('targetDate');
    const mainTitleInput = document.getElementById('mainTitle');
    const eventNameInput = document.getElementById('eventName');
    const eventStatusSelect = document.getElementById('eventStatus');
    const mainTitleElement = document.querySelector('.main-title');
    const descriptionElement = document.querySelector('.description');
    const targetDateDisplay = document.getElementById('targetDateDisplay');
    const eventStatusElement = document.getElementById('eventStatusDisplay');
    
    // 卡片元素
    const yearCard = document.getElementById('yearCard');
    const monthCard = document.getElementById('monthCard');
    const dayCard = document.getElementById('dayCard');
    const hourCard = document.getElementById('hourCard');
    const minuteCard = document.getElementById('minuteCard');
    const secondCard = document.getElementById('secondCard');
    
    // 默认目标时间（当前时间 + 1天）
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    
    // 从本地存储加载设置
    loadSettings();
    
    // 初始化倒计时
    updateCountdown();
    
    // 每秒更新倒计时
    setInterval(updateCountdown, 1000);
    
    // 设置按钮点击事件
    if (settingsBtn) {
        settingsBtn.onclick = function() {
            console.log('设置按钮被点击');
            if (settingsDrawer) {
                settingsDrawer.classList.add('open');
                // 确保抽屉显示在视口内
                document.body.style.overflow = 'hidden';
            }
        };
    }
    
    // 关闭抽屉按钮点击事件
    if (closeDrawerBtn) {
        closeDrawerBtn.onclick = function() {
            if (settingsDrawer) {
                settingsDrawer.classList.remove('open');
                document.body.style.overflow = '';
            }
        };
    }
    
    // 测试按钮点击事件
    const testBtn = document.getElementById('testBtn');
    if (testBtn) {
        testBtn.addEventListener('click', function() {
            console.log('测试按钮被点击');
            alert('测试按钮被点击');
            if (settingsDrawer) {
                settingsDrawer.classList.add('open');
                document.body.style.overflow = 'hidden';
            } else {
                alert('找不到设置抽屉元素');
            }
        });
    }
    
    // 保存设置按钮点击事件
    if (saveSettingsBtn) {
        saveSettingsBtn.onclick = function() {
            console.log('保存设置按钮被点击');
            
            const newTargetDate = new Date(targetDateInput.value);
            const newMainTitle = mainTitleInput.value;
            const newEventName = eventNameInput.value;
            const newEventStatus = eventStatusSelect.value;
            
            if (isNaN(newTargetDate.getTime())) {
                alert('请输入有效的日期时间');
                return;
            }
            
            console.log('新的目标日期:', newTargetDate);
            console.log('新的主标题:', newMainTitle);
            console.log('新的事件名称:', newEventName);
            console.log('新的事件状态:', newEventStatus);
            
            targetDate = newTargetDate;
            
            if (mainTitleElement) {
                mainTitleElement.textContent = newMainTitle || '世界职业院校技能大赛';
            }
            
            if (descriptionElement) {
                descriptionElement.textContent = newEventName || 'XX赛道倒计时';
            }
            
            const statusElement = document.getElementById('eventStatusDisplay');
            if (statusElement) {
                statusElement.textContent = newEventStatus;
                console.log('更新事件状态显示为:', newEventStatus);
            } else {
                console.error('找不到事件状态显示元素');
            }
            
            // 更新目标日期显示
            updateTargetDateDisplay();
            
            // 保存设置到本地存储
            saveSettings();
            
            // 关闭抽屉
            if (settingsDrawer) {
                settingsDrawer.classList.remove('open');
                document.body.style.overflow = '';
            }
            
            // 更新倒计时
            updateCountdown();
            
            // 显示保存成功提示
            // alert('设置已保存');
            
        };
    } else {
        console.error('找不到保存设置按钮');
    }
    
    // 更新目标日期显示
    function updateTargetDateDisplay() {
        if (targetDateDisplay) {
            const year = targetDate.getFullYear();
            const month = targetDate.getMonth() + 1;
            const day = targetDate.getDate();
            console.log('更新目标日期显示:', `${year}年${month}月${day}日`);
            targetDateDisplay.textContent = `${year}年${month}月${day}日`;
        } else {
            console.error('找不到目标日期显示元素');
        }
    }
    
    // 保存设置到本地存储
    function saveSettings() {
        try {
            const settings = {
                targetDate: targetDate.toISOString(),
                mainTitle: mainTitleElement ? mainTitleElement.textContent : '世界职业院校技能大赛',
                eventName: descriptionElement ? descriptionElement.textContent : 'XX赛道倒计时',
                eventStatus: document.getElementById('eventStatusDisplay') ? document.getElementById('eventStatusDisplay').textContent : '开幕'
            };
            
            console.log('保存设置:', settings);
            localStorage.setItem('countdownSettings', JSON.stringify(settings));
            console.log('设置已保存到本地存储');
        } catch (error) {
            console.error('保存设置时出错:', error);
        }
    }
    
    // 从本地存储加载设置
    function loadSettings() {
        try {
            const savedSettings = localStorage.getItem('countdownSettings');
            console.log('加载保存的设置:', savedSettings);
            
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                targetDate = new Date(settings.targetDate);
                console.log('加载的目标日期:', targetDate);
                
                if (settings.mainTitle && mainTitleElement) {
                    mainTitleElement.textContent = settings.mainTitle;
                    console.log('加载的主标题:', settings.mainTitle);
                }
                
                if (descriptionElement && settings.eventName) {
                    descriptionElement.textContent = settings.eventName;
                    console.log('加载的事件名称:', settings.eventName);
                }
                
                if (settings.eventStatus) {
                    const statusElement = document.getElementById('eventStatusDisplay');
                    if (statusElement) {
                        statusElement.textContent = settings.eventStatus;
                        console.log('加载的事件状态显示为:', settings.eventStatus);
                    } else {
                        console.error('找不到事件状态显示元素');
                    }
                    
                    // 设置下拉选择框的值
                    if (eventStatusSelect) {
                        for(let i = 0; i < eventStatusSelect.options.length; i++) {
                            if(eventStatusSelect.options[i].value === settings.eventStatus) {
                                eventStatusSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                }
                
                // 更新目标日期显示
                updateTargetDateDisplay();
                
                // 更新设置表单
                if (targetDateInput) {
                    const localDateString = new Date(targetDate.getTime() - targetDate.getTimezoneOffset() * 60000)
                        .toISOString()
                        .slice(0, 16);
                    targetDateInput.value = localDateString;
                }
                
                if (mainTitleInput && mainTitleElement) {
                    mainTitleInput.value = mainTitleElement.textContent;
                }
                
                if (eventNameInput && settings.eventName) {
                    eventNameInput.value = settings.eventName;
                }
            } else {
                console.log('没有找到保存的设置，使用默认值');
                // 设置默认值
                if (targetDateInput) {
                    const localDateString = new Date(targetDate.getTime() - targetDate.getTimezoneOffset() * 60000)
                        .toISOString()
                        .slice(0, 16);
                    targetDateInput.value = localDateString;
                }
                
                if (mainTitleInput && mainTitleElement) {
                    mainTitleInput.value = mainTitleElement.textContent;
                }
                
                if (eventNameInput && descriptionElement) {
                    eventNameInput.value = descriptionElement.textContent;
                }
                
                // 更新目标日期显示
                updateTargetDateDisplay();
            }
        } catch (error) {
            console.error('加载设置时出错:', error);
        }
    }
    
    // 更新倒计时
    function updateCountdown() {
        try {
            const now = new Date();
            const diff = targetDate - now;
            console.log('当前时间:', now);
            console.log('目标时间:', targetDate);
            console.log('时间差(毫秒):', diff);
            
            if (diff <= 0) {
                // 倒计时结束
                console.log('倒计时结束');
                if (yearCard) updateCard(yearCard, 0);
                if (monthCard) updateCard(monthCard, 0);
                if (dayCard) updateCard(dayCard, 0);
                if (hourCard) updateCard(hourCard, 0);
                if (minuteCard) updateCard(minuteCard, 0);
                if (secondCard) updateCard(secondCard, 0);
                return;
            }
            
            // 计算剩余时间
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            console.log('剩余时间:', years, '年', months, '月', days, '日', hours, '时', minutes, '分', seconds, '秒');
            
            // 更新卡片
            if (yearCard) updateCard(yearCard, years);
            if (monthCard) updateCard(monthCard, months);
            if (dayCard) updateCard(dayCard, days);
            if (hourCard) updateCard(hourCard, hours);
            if (minuteCard) updateCard(minuteCard, minutes);
            if (secondCard) updateCard(secondCard, seconds);
        } catch (error) {
            console.error('更新倒计时时出错:', error);
        }
    }
    
    // 更新卡片显示
    function updateCard(cardElement, newValue) {
        try {
            const frontNumber = cardElement.querySelector('.flip-card-front .number');
            const backNumber = cardElement.querySelector('.flip-card-back .number');
            
            if (!frontNumber || !backNumber) {
                console.error('找不到卡片的正面或背面元素');
                return;
            }
            
            // 如果值没有变化，不执行翻转动画
            if (frontNumber.textContent === String(newValue)) {
                return;
            }
            
            console.log('更新卡片:', cardElement.id, '从', frontNumber.textContent, '到', newValue);
            
            // 设置新值到背面
            backNumber.textContent = newValue;
            
            // 添加翻转类
            cardElement.classList.add('flip');
            
            // 翻转动画结束后，更新正面值并重置翻转
            setTimeout(() => {
                frontNumber.textContent = newValue;
                cardElement.classList.remove('flip');
            }, 600); // 与CSS中的transition时间相匹配
        } catch (error) {
            console.error('更新卡片显示时出错:', error);
        }
    }
});