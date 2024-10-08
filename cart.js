// header切換種類
const h3Elements = document.querySelectorAll('.categories h3');

h3Elements.forEach(h3 => {
    h3.addEventListener('click', () => {
        h3Elements.forEach(el => {
            el.classList.remove('active');
        });

        h3.classList.add('active');
    });
});


// 計數功能
const countContainers = document.querySelectorAll('.count');
countContainers.forEach(container => {
    const countDisplay = container.querySelector('p');
    const minusBtn = container.querySelector('figure:first-child img');
    const plusBtn = container.querySelector('figure:last-child img');

    let count = 0; // 歸零

    function updateCount() {
        countDisplay.textContent = count;

        // 不能小於0
        if (count === 0) {
            minusBtn.style.opacity = '0.5';
            minusBtn.style.pointerEvents = 'none';
        } else {
            minusBtn.style.opacity = '1';
            minusBtn.style.pointerEvents = 'auto';
        }
    }

    // 點擊 plus 時增加 count
    plusBtn.addEventListener('click', () => {
        count++;
        updateCount();
    });

    // 點擊 minus 時減少 count
    minusBtn.addEventListener('click', () => {
        if (count > 0) {
            count--;
            updateCount();
        }
    });

    // 初始化
    updateCount();
});


// 展開收合功能
const cardBodies = document.querySelectorAll('.card_body');

cardBodies.forEach(cardBody => {
    const amount = cardBody.closest('.card').querySelector('.amount'); // 選取對應 card 內的 amount 元素

    cardBody.addEventListener('click', () => {
        if (amount.style.display === 'none' || amount.style.display === '') {
            amount.style.display = 'flex';
        } else {
            amount.style.display = 'none';
        }
    });
});




// 加入購物車功能
const addButtons = document.querySelectorAll('.add');

const finalAmountElement = document.getElementById('final_amount');
const jpyElement = document.querySelector('.jpy h5');
const ntdElement = document.querySelector('.ntd h5');

addButtons.forEach(addButton => {
    addButton.addEventListener('click', () => {
        const card = addButton.closest('.card');
        const countElement = card.querySelector('.count p');
        const goodsAmountElement = card.querySelector('#goods_amount');

        let count = parseInt(countElement.textContent, 10);
        if (count > 0) {
            const cardBody = card.querySelector('.card_body');
            cardBody.style.backgroundColor = '#383838';
            cardBody.style.color = '#ffffff';

            cardBody.querySelectorAll('*').forEach(child => {
                child.style.color = '#ffffff';
            });
            goodsAmountElement.textContent = count;

        } else {
            const cardBody = card.querySelector('.card_body');
            cardBody.style.backgroundColor = '';
            cardBody.style.color = '';

            cardBody.querySelectorAll('*').forEach(child => {
                child.style.color = '';
            });
            goodsAmountElement.textContent = 0;
        }
        // 更新金額
        updateFinalAmounts();
    });
});

// 更新金額
function updateFinalAmounts() {
    let finalAmount = 0;

    document.querySelectorAll('#goods_amount').forEach(goodsAmountElement => {
        finalAmount += parseInt(goodsAmountElement.textContent, 10);
    });

    finalAmountElement.textContent = finalAmount;

    jpyElement.textContent = finalAmount * 400;
    ntdElement.textContent = finalAmount * 250;
}