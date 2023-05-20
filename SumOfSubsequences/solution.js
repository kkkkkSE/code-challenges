function solution(sequence, k) {
    const pos = [];
    let sum = 0;
    let j = 0;

    for(let i = 0; i < sequence.length; i++){
        if(sequence[i] > k) break;

        sum += sequence[i];

        while(k <= sum) {
            if(sum === k) pos.push([j, i]);

            sum -= sequence[j];
            j++;
        }
    }

    return pos.reduce((a, c) => {
        const aCnt = a[1]-a[0], cCnt = c[1]-c[0];

        if(aCnt > cCnt) return c;
        else return a;
    })
}

// 슬라이딩 윈도우

// idx 0부터(i) sequence를 순회하며 더해간다. => sequence[i]가 k보다 크면 break(비내림차순)
// 어디부터 더하기 시작했는지 idx를 기록한다(j)
// -> 더한 값이 k보다 크거나 같으면 while문 진입
// 1. (if) sum = k 면 pos에 좌표 기록
// 2. sum에서 sequence[j]를 빼고, j++
// 마지막에 나온 pos에서 최단 길이 + 앞 index
