const container = document.getElementById('puzzle-container');
const message = document.getElementById('message');
const imagePath = './image/run.jpg';

// 拼图初始化
function initPuzzle() {
    const positions = [...Array(9).keys()]; // 0-8
    shuffleArray(positions); // 打乱顺序

    positions.forEach((pos, index) => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        if (pos !== 8) {
            piece.style.backgroundImage = `url(${imagePath})`;
            piece.style.backgroundPosition = `${-(pos % 3) * 100}px ${-Math.floor(pos / 3) * 100}px`;
            piece.dataset.index = pos;
        } else {
            piece.classList.add('empty'); // 空白块
        }
        piece.dataset.position = index; // 当前的位置
        piece.addEventListener('click', () => movePiece(index));
        container.appendChild(piece);
    });
}

// 打乱数组
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 移动拼图块
function movePiece(index) {
    const pieces = Array.from(container.children);
    const emptyIndex = pieces.findIndex(piece => piece.classList.contains('empty'));

    // 检查是否可以移动
    const validMoves = [emptyIndex - 3, emptyIndex + 3];
    if (emptyIndex % 3 !== 0) validMoves.push(emptyIndex - 1);
    if (emptyIndex % 3 !== 2) validMoves.push(emptyIndex + 1);

    if (validMoves.includes(index)) {
        // 交换图片和类名
        [pieces[index].dataset.position, pieces[emptyIndex].dataset.position] =
            [pieces[emptyIndex].dataset.position, pieces[index].dataset.position];

        pieces[index].classList.add('empty');
        pieces[emptyIndex].classList.remove('empty');

        // 更新背景图
        const tempBackground = pieces[index].style.backgroundImage;
        pieces[index].style.backgroundImage = pieces[emptyIndex].style.backgroundImage;
        pieces[emptyIndex].style.backgroundImage = tempBackground;

        checkCompletion();
    }
}

// 检测是否完成拼图
function checkCompletion() {
    const pieces = Array.from(container.children);
    const isComplete = pieces.every(
        (piece, i) => parseInt(piece.dataset.position, 10) === i
    );

    if (isComplete) {
        message.style.display = 'block';
    }
}

initPuzzle();
