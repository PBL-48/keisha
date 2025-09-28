// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // 要素を取得
    const totalInput = document.getElementById('total');

    // 人数入力フィールド
    const seniorNumberInput = document.getElementById('senior-number');
    const juniorNumberInput = document.getElementById('junior-number');
    const sophomoreNumberInput = document.getElementById('sophomore-number');
    const freshmanNumberInput = document.getElementById('freshman-number');

    // 傾斜スライダー（割合）
    const seniorSlider = document.getElementById('senior');
    const juniorSlider = document.getElementById('junior');
    const sophomoreSlider = document.getElementById('sophomore');
    const freshmanSlider = document.getElementById('freshman');

    const seniorResult = document.getElementById('senior-result');
    const juniorResult = document.getElementById('junior-result');
    const sophomoreResult = document.getElementById('sophomore-result');
    const freshmanResult = document.getElementById('freshman-result');

    // 計算を行う関数
    function calculateSplit() {
        const total = parseInt(totalInput.value) || 0;

        // 人数を取得
        const seniorCount = parseInt(seniorNumberInput.value) || 0;
        const juniorCount = parseInt(juniorNumberInput.value) || 0;
        const sophomoreCount = parseInt(sophomoreNumberInput.value) || 0;
        const freshmanCount = parseInt(freshmanNumberInput.value) || 0;

        // 傾斜割合を取得（0-100%）
        const seniorRate = parseInt(seniorSlider.value) || 0;
        const juniorRate = parseInt(juniorSlider.value) || 0;
        const sophomoreRate = parseInt(sophomoreSlider.value) || 0;
        const freshmanRate = parseInt(freshmanSlider.value) || 0;

        // 総人数を計算
        const totalPeople = seniorCount + juniorCount + sophomoreCount + freshmanCount;

        if (totalPeople === 0) {
            // 人数が0の場合は結果をクリア
            seniorResult.textContent = '傾斜: 50%';
            juniorResult.textContent = '傾斜: 50%';
            sophomoreResult.textContent = '傾斜: 50%';
            freshmanResult.textContent = '傾斜: 50%';
            return;
        }

        // 各学年の支払い比率を考慮した「重み付き人数」を計算
        const seniorWeighted = seniorCount * (1 + seniorRate / 100);
        const juniorWeighted = juniorCount * (1 + juniorRate / 100);
        const sophomoreWeighted = sophomoreCount * (1 + sophomoreRate / 100);
        const freshmanWeighted = freshmanCount * (1 + freshmanRate / 100);

        const totalWeightedPeople = seniorWeighted + juniorWeighted + sophomoreWeighted + freshmanWeighted;

        if (totalWeightedPeople === 0) {
            // 人数が0の場合は結果をクリア
            seniorResult.textContent = '傾斜: 50%';
            juniorResult.textContent = '傾斜: 50%';
            sophomoreResult.textContent = '傾斜: 50%';
            freshmanResult.textContent = '傾斜: 50%';
            const existingRemainder = document.getElementById('total-remainder');
            if (existingRemainder) {
                existingRemainder.remove();
            }
            return;
        }

        // 傾斜を考慮した一人当たりの基準額を計算
        const baseAmountPerWeight = total / totalWeightedPeople;

        // 各学年の傾斜を適用した一人当たりの金額を計算（100円単位で四捨五入）
        const seniorPerPerson = Math.round((baseAmountPerWeight * (1 + seniorRate / 100)) / 100) * 100;
        const juniorPerPerson = Math.round((baseAmountPerWeight * (1 + juniorRate / 100)) / 100) * 100;
        const sophomorePerPerson = Math.round((baseAmountPerWeight * (1 + sophomoreRate / 100)) / 100) * 100;
        const freshmanPerPerson = Math.round((baseAmountPerWeight * (1 + freshmanRate / 100)) / 100) * 100;

        // 各学年の合計金額を計算
        const seniorTotal = seniorCount * seniorPerPerson;
        const juniorTotal = juniorCount * juniorPerPerson;
        const sophomoreTotal = sophomoreCount * sophomorePerPerson;
        const freshmanTotal = freshmanCount * freshmanPerPerson;

        // 実際の支払い総額
        const actualTotal = seniorTotal + juniorTotal + sophomoreTotal + freshmanTotal;
        const remainder = actualTotal - total;

        // 結果を表示
        seniorResult.innerHTML = `傾斜: +${seniorRate}%<br>一人当たり: ${seniorPerPerson}円`;
        juniorResult.innerHTML = `傾斜: +${juniorRate}%<br>一人当たり: ${juniorPerPerson}円`;
        sophomoreResult.innerHTML = `傾斜: +${sophomoreRate}%<br>一人当たり: ${sophomorePerPerson}円`;
        freshmanResult.innerHTML = `傾斜: +${freshmanRate}%<br>一人当たり: ${freshmanPerPerson}円`;

        // 余りがある場合の表示（100円単位での切り上げによる差額）
        // 既存の余り表示があれば削除
        const existingRemainder = document.getElementById('total-remainder');
        if (existingRemainder) {
            existingRemainder.remove();
        }

        if (remainder !== 0) {
            const totalResultDiv = document.createElement('div');
            totalResultDiv.id = 'total-remainder';
            if (remainder > 0) {
                totalResultDiv.innerHTML = `<br><strong>実際の支払い総額: ${actualTotal}円</strong><br><strong>差額: +${remainder}円</strong>`;
            } else {
                totalResultDiv.innerHTML = `<br><strong>実際の支払い総額: ${actualTotal}円</strong><br><strong>差額: ${remainder}円</strong>`;
            }

            // body に余り情報を追加
            document.body.appendChild(totalResultDiv);
        }
    }

    // イベントリスナーを追加
    totalInput.addEventListener('input', calculateSplit);

    // 人数入力フィールド
    seniorNumberInput.addEventListener('input', calculateSplit);
    juniorNumberInput.addEventListener('input', calculateSplit);
    sophomoreNumberInput.addEventListener('input', calculateSplit);
    freshmanNumberInput.addEventListener('input', calculateSplit);

    // 傾斜スライダー
    seniorSlider.addEventListener('input', calculateSplit);
    juniorSlider.addEventListener('input', calculateSplit);
    sophomoreSlider.addEventListener('input', calculateSplit);
    freshmanSlider.addEventListener('input', calculateSplit);

    // 初回計算
    calculateSplit();
});