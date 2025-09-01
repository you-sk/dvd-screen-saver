const screenElement = document.getElementById('screen');
const messageBox = document.getElementById('message-box');
const logoTextInput = document.getElementById('logo-text-input');
const logoCountInput = document.getElementById('logo-count-input');
const applySettingsButton = document.getElementById('apply-settings-button');
const settingsContainer = document.getElementById('settings-container'); // コンテナの参照
const settingsPanel = document.getElementById('settings-panel');
const toggleSettingsButton = document.getElementById('toggle-settings-button');

let logos = [];
let animationFrameId;

const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#FFFFFF'
];

function createLogo(text) {
    const logoElement = document.createElement('div');
    logoElement.classList.add('logo');
    logoElement.textContent = text;
    
    const screenWidth = screenElement.clientWidth;
    const screenHeight = screenElement.clientHeight;

    logoElement.style.visibility = 'hidden';
    logoElement.style.position = 'absolute';
    document.body.appendChild(logoElement);
    const logoWidth = logoElement.offsetWidth;
    const logoHeight = logoElement.offsetHeight;
    document.body.removeChild(logoElement);
    logoElement.style.visibility = 'visible';

    const maxX = Math.max(0, screenWidth - logoWidth - 1);
    const maxY = Math.max(0, screenHeight - logoHeight - 1);

    return {
        element: logoElement,
        x: Math.random() * maxX,
        y: Math.random() * maxY,
        dx: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1.5 + 1),
        dy: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1.5 + 1),
        colorIndex: Math.floor(Math.random() * colors.length),
        width: logoWidth,
        height: logoHeight
    };
}

function initializeLogos() {
    logos.forEach(logo => {
        if (screenElement.contains(logo.element)) {
            screenElement.removeChild(logo.element);
        }
    });
    logos = [];

    const logoText = logoTextInput.value || "DVD";
    let logoCount = parseInt(logoCountInput.value, 10) || 1;

    if (logoCount > 20) {
        logoCountInput.value = "20";
        logoCount = 20;
        showTemporaryMessage("ロゴの数は最大20個です。");
    } else if (logoCount < 1) {
        logoCountInput.value = "1";
        logoCount = 1;
        showTemporaryMessage("ロゴの数は1個以上です。");
    }

    for (let i = 0; i < logoCount; i++) {
        const newLogo = createLogo(logoText);
        newLogo.element.style.color = colors[newLogo.colorIndex];
        logos.push(newLogo);
        screenElement.appendChild(newLogo.element);
    }
    
    logos.forEach(logo => {
        logo.width = logo.element.offsetWidth;
        logo.height = logo.element.offsetHeight;
    });

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    animate();
}

function updateLogoDimensions(logo) {
    logo.element.style.visibility = 'hidden';
    logo.width = logo.element.offsetWidth;
    logo.height = logo.element.offsetHeight;
    logo.element.style.visibility = 'visible';
}

function animate() {
    const screenWidth = screenElement.clientWidth;
    const screenHeight = screenElement.clientHeight;
    let cornerHitCount = 0;

    logos.forEach(logo => {
        logo.x += logo.dx;
        logo.y += logo.dy;

        let hitWall = false;
        let currentHitCorner = false;

        if (logo.x + logo.width >= screenWidth) {
            logo.x = screenWidth - logo.width;
            logo.dx = -logo.dx;
            changeColor(logo);
            hitWall = true;
            if (logo.y + logo.height >= screenHeight || logo.y <= 0) currentHitCorner = true;
        } else if (logo.x <= 0) {
            logo.x = 0;
            logo.dx = -logo.dx;
            changeColor(logo);
            hitWall = true;
            if (logo.y + logo.height >= screenHeight || logo.y <= 0) currentHitCorner = true;
        }

        if (logo.y + logo.height >= screenHeight) {
            logo.y = screenHeight - logo.height;
            logo.dy = -logo.dy;
            if (!hitWall) changeColor(logo); 
            hitWall = true;
            if (logo.x + logo.width >= screenWidth || logo.x <= 0) currentHitCorner = true;
        } else if (logo.y <= 0) {
            logo.y = 0;
            logo.dy = -logo.dy;
            if (!hitWall) changeColor(logo);
            hitWall = true;
            if (logo.x + logo.width >= screenWidth || logo.x <= 0) currentHitCorner = true;
        }
        
        logo.element.style.left = logo.x + 'px';
        logo.element.style.top = logo.y + 'px';

        if (currentHitCorner) {
            cornerHitCount++;
        }
    });

    if (cornerHitCount > 0) {
        showTemporaryMessage(`${cornerHitCount}個のロゴが角にヒット！`);
    }

    animationFrameId = requestAnimationFrame(animate);
}

function changeColor(logo) {
    let newColorIndex;
    do {
        newColorIndex = Math.floor(Math.random() * colors.length);
    } while (newColorIndex === logo.colorIndex);
    logo.colorIndex = newColorIndex;
    logo.element.style.color = colors[logo.colorIndex];
}

function showTemporaryMessage(message) {
    messageBox.textContent = message;
    // メッセージボックスの位置を動的に設定
    if (settingsPanel.classList.contains('hidden')) {
        messageBox.style.top = (toggleSettingsButton.offsetHeight + 15) + 'px'; // トグルボタンのすぐ下
    } else {
        messageBox.style.top = (settingsContainer.offsetHeight + 15) + 'px'; // 設定コンテナ全体のすぐ下
    }
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 2500);
}

function toggleSettingsVisibility() {
    if (settingsPanel.classList.contains('hidden')) {
        settingsPanel.classList.remove('hidden');
        settingsPanel.style.position = 'relative'; // 表示時は元のレイアウトに戻す
        toggleSettingsButton.textContent = '設定を隠す';
        toggleSettingsButton.classList.remove('subtle'); // 控えめスタイルを解除
    } else {
        settingsPanel.classList.add('hidden');
        // hiddenクラスで position: absolute になるので、ここでは何もしない
        toggleSettingsButton.textContent = '設定'; // テキストを短く
        toggleSettingsButton.classList.add('subtle'); // 控えめスタイルを適用
    }
    // メッセージボックスの位置を更新
    // showTemporaryMessageが呼ばれる際に位置調整されるので、ここでは不要かもしれないが念のため
     if (messageBox.style.display === 'block') { // メッセージ表示中なら位置再調整
        if (settingsPanel.classList.contains('hidden')) {
            messageBox.style.top = (toggleSettingsButton.offsetHeight + 15) + 'px';
        } else {
            messageBox.style.top = (settingsContainer.offsetHeight + 15) + 'px';
        }
    }
}

applySettingsButton.addEventListener('click', initializeLogos);
toggleSettingsButton.addEventListener('click', toggleSettingsVisibility);

window.onresize = () => {
    const screenWidth = screenElement.clientWidth;
    const screenHeight = screenElement.clientHeight;

    logos.forEach(logo => {
        updateLogoDimensions(logo);
        
        if (logo.x + logo.width > screenWidth) logo.x = screenWidth - logo.width;
        if (logo.x < 0) logo.x = 0;
        if (logo.y + logo.height > screenHeight) logo.y = screenHeight - logo.height;
        if (logo.y < 0) logo.y = 0;
    });

    // メッセージボックスの位置を再調整
    if (messageBox.style.display === 'block') {
         if (settingsPanel.classList.contains('hidden')) {
            messageBox.style.top = (toggleSettingsButton.offsetHeight + 15) + 'px';
        } else {
            messageBox.style.top = (settingsContainer.offsetHeight + 15) + 'px';
        }
    }
};

window.onload = () => {
    initializeLogos();
    // 初期状態では設定パネルは表示されているので、メッセージボックスの位置を調整
    // showTemporaryMessageを呼ぶわけではないので、直接設定
    messageBox.style.top = (settingsContainer.offsetHeight + 15) + 'px';
};