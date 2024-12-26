const container = document.getElementById('puzzle-container');
const preview = document.getElementById('preview');
const imagePath = './image/run.jpg';

function adjustPuzzleSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth >= 768) {
        // 电脑端
        const size = Math.min(screenWidth * 0.6, 800); // 宽度为屏幕的 60%，最大为 800px
        container.style.width = `${size}px`;
        container.style.height = `${size}px`;
        preview.style.width = `${size}px`;
    } else {
        // 移动端
        const size = Math.min(screenWidth * 0.9, 500); // 宽度为屏幕的 90%，最大为 500px
        container.style.width = `${size}px`;
        container.style.height = `${size}px`;
        preview.style.width = `${size}px`;
    }
}

// 调整拼图大小
adjustPuzzleSize();
window.addEventListener('resize', adjustPuzzleSize); // 监听窗口调整事件

// 初始化拼图逻辑
function initPuzzle() {
    const positions = [...Array(9).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8]
    shuffleArray(positions);

    container.innerHTML = '';
    positions.forEach((pos, index) => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.dataset.index = index;

        if (pos !== 8) {
            piece.style.backgroundImage = `url(${imagePath})`;
            piece.style.backgroundPosition = `${-(pos % 3) * 100}% ${-Math.floor(pos / 3) * 100}%`;
            piece.dataset.correct = pos;
        } else {
            piece.classList.add('empty');
            piece.dataset.correct = 8;
        }

        piece.addEventListener('click', () => movePiece(index));
        container.appendChild(piece);
    });
}

// 其他拼图逻辑保持不变


function initPuzzle() {
    container.innerHTML = ''; // 清空容器
    const positions = [...Array(9).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8]
    shuffleArray(positions); // 打乱数组顺序

    positions.forEach((pos, index) => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.dataset.index = index;

        if (pos !== 8) {
            piece.style.backgroundImage = `url(${imagePath})`;
            piece.style.backgroundPosition = `${-(pos % 3) * 100}% ${-Math.floor(pos / 3) * 100}%`;
            piece.dataset.correct = pos;
        } else {
            piece.classList.add('empty'); // 空白块
            piece.dataset.correct = 8;
        }

        piece.addEventListener('click', () => movePiece(index));
        container.appendChild(piece);
    });
}

function movePiece(index) {
    const pieces = Array.from(container.children);
    const emptyIndex = pieces.findIndex(piece => piece.classList.contains('empty'));

    // 检查是否相邻
    const isAdjacent = checkAdjacent(index, emptyIndex);
    if (isAdjacent) {
        // 交换空白块和当前块的位置
        swapPieces(pieces[index], pieces[emptyIndex]);
        checkCompletion();
    }
}

function checkAdjacent(index, emptyIndex) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    return (
        (row === emptyRow && Math.abs(col - emptyCol) === 1) || // 同一行左右相邻
        (col === emptyCol && Math.abs(row - emptyRow) === 1)   // 同一列上下相邻
    );
}

function swapPieces(piece, emptyPiece) {
    // 交换背景图片位置
    const tempBgImage = piece.style.backgroundImage;
    const tempBgPosition = piece.style.backgroundPosition;
    const tempCorrect = piece.dataset.correct;

    piece.style.backgroundImage = emptyPiece.style.backgroundImage;
    piece.style.backgroundPosition = emptyPiece.style.backgroundPosition;
    piece.dataset.correct = emptyPiece.dataset.correct;

    emptyPiece.style.backgroundImage = tempBgImage;
    emptyPiece.style.backgroundPosition = tempBgPosition;
    emptyPiece.dataset.correct = tempCorrect;

    piece.classList.toggle('empty');
    emptyPiece.classList.toggle('empty');
}

function checkCompletion() {
    const pieces = Array.from(container.children);
    const isComplete = pieces.every(
        (piece, i) => parseInt(piece.dataset.correct, 10) === i
    );

    if (isComplete) {
        message.style.display = 'block';
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initPuzzle();
