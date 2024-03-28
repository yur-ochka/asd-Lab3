const variant = 3327;
const variantString = variant.toString();
const n1 = parseInt(variantString[0]);
const n2 = parseInt(variantString[1]);
const n3 = parseInt(variantString[2]);
const n4 = parseInt(variantString[3]);

const n = 10 + n3;

let matrix = [];
const koef = 1 - n3 * 0.02 - n4 * 0.005 - 0.25;
for (let i = 0; i < n; i++) {
    let row = []; 
    for (let j = 0; j < n; j++) { 
        let elem = (Math.random() * 2) * koef;
        row.push(Math.floor(elem));
    }
    matrix.push(row); 
}
console.log(matrix);

let undirMatrix = [];
for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) { 
        row.push(matrix[i][j] || matrix[j][i]);
    }
    undirMatrix.push(row);
}
console.log(undirMatrix);

 // Розміщення вершин у колі
 const nodePositions = [];
 const radius = 450;
 const centerX = 500;
 const centerY = 500;
 const angleIncrement = (2 * Math.PI) / (n - 1);      
        
 for (let i = 0; i < n - 1; i++) {
    const x = centerX + radius * Math.cos(i * angleIncrement);
    const y = centerY + radius * Math.sin(i * angleIncrement);
    nodePositions.push({ x, y });
} 
const x = centerX;
const y = centerY;
nodePositions.push({ x, y });

// Малюємо граф на canvas
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// Малюємо зв'язки між вершинами
ctx.strokeStyle = 'black';
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // Малюємо лінію між вершинами (зв'язок), якщо існує зв'язок між ними
        if (undirMatrix[i][j] == 1) {
            if(i != j)
            {
            ctx.beginPath();
            ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
            ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
            ctx.stroke();
            }
            else{
                selfCircle(i);
            }
            
        }
    }
}        

// Малюємо вершини
for (let i = 0; i < n; i++) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(nodePositions[i].x, nodePositions[i].y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = 'white'; 
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${i+1}`, nodePositions[i].x, nodePositions[i].y);
}
        
        
        
        
// Малюємо граф на canvas
const canvasArrows = document.getElementById('graphCanvasWithArrows');
const ctxArrow = canvasArrows.getContext('2d');

// Малюємо зв'язки між вершинами
ctxArrow.strokeStyle = 'black';
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // Малюємо лінію між вершинами (зв'язок), якщо існує зв'язок між ними
        if (matrix[i][j] == 1) {
            if(i != j)
            {
                ctxArrow.beginPath();
                ctxArrow.moveTo(nodePositions[j].x, nodePositions[j].y);
                if((nodePositions[j].x < centerX && nodePositions[i].x < centerX) || (nodePositions[j].x > centerX && nodePositions[i].x > centerX))
                {
                    ctxArrow.lineTo(nodePositions[i].x + 20, nodePositions[i].y);
                }
                else {
                    ctxArrow.lineTo(nodePositions[i].x, nodePositions[i].y + 20);
                }
                ctxArrow.stroke();
                const angle = Math.atan2(nodePositions[j].y - nodePositions[i].y, nodePositions[j].x - nodePositions[i].x);
                const offsetX = Math.cos(angle) * 30;
                const offsetY = Math.sin(angle) * 30;          
                drawArrowhead(ctxArrow, nodePositions[j].x - offsetX, nodePositions[j].y - offsetY, angle);
            }
            else {
                selfArrow(i);
            }
        }
        }
    }      

// Малюємо вершини
for (let i = 0; i < n; i++) {
    ctxArrow.fillStyle = 'red';
    ctxArrow.beginPath();
    ctxArrow.arc(nodePositions[i].x, nodePositions[i].y, 30, 0, Math.PI * 2);
    ctxArrow.fill();
    ctxArrow.closePath();
    ctxArrow.fillStyle = 'white'; 
    ctxArrow.font = '24px Arial';
    ctxArrow.textAlign = 'center';
    ctxArrow.textBaseline = 'middle';
    ctxArrow.fillText(`${i+1}`, nodePositions[i].x, nodePositions[i].y);
}       
        
function drawArrowhead(ctx, x, y, angle) {
    const arrowheadSize = 15;
    ctxArrow.save();
    ctxArrow.translate(x, y);
    ctxArrow.rotate(angle);
    ctxArrow.beginPath();
    ctxArrow.moveTo(0, 0);
    ctxArrow.lineTo(-arrowheadSize, arrowheadSize / 2);
    ctxArrow.lineTo(-arrowheadSize, -arrowheadSize / 2);
    ctxArrow.closePath();
    ctxArrow.fill();
    ctxArrow.restore();
}


function selfArrow(i) {
    const arrowheadSize = 15;
    let x, y;

    // Визначаємо зміщення для початку стрілки в залежності від положення ноди на канвасі
    const offsetX = nodePositions[i].x < canvasArrows.width / 2 ? -30 : 30;

    // Визначаємо напрямок стрілки в залежності від положення ноди на канвасі
    const angle = nodePositions[i].x < canvasArrows.width / 2 ? Math.PI / 4 : Math.PI * 3 / 4;

    // Розраховуємо координати початку стрілки
    x = nodePositions[i].x + offsetX;
    y = nodePositions[i].y;

    ctxArrow.beginPath();
    ctxArrow.moveTo(nodePositions[i].x, nodePositions[i].y);
    ctxArrow.lineTo(x, y);
    ctxArrow.stroke();
    drawArrowhead(ctxArrow, x, y, angle);

    ctxArrow.strokeStyle = 'black';
    ctxArrow.beginPath();
    ctxArrow.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5/2);
    ctxArrow.stroke();
    ctxArrow.closePath();
}

function selfCircle(i) {
    let x, y;

    const offsetX = nodePositions[i].x < canvas.width / 2 ? -30 : 30;


    x = nodePositions[i].x + offsetX;
    y = nodePositions[i].y;

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5);
    ctx.stroke();
    ctx.closePath();
}
