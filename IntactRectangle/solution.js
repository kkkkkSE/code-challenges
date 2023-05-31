function solution(w, h) {
    const square = w * h;
    let answer = 0;
    let divider = 1;

    for(let i = 2; i <= Math.sqrt(w) || i <= Math.sqrt(h);){
        if(!(w % i) && !(h % i)){
            w /= i, h /= i;
            divider *= i;
        }else{
            i += i !== 2 ? 2 : 1; // 2를 제외한 모든 짝수 제외
        }
    }

    const x = Math.min(w, h), y = Math.max(w, h);
    let prevY = 0;

    for(let i = 1; i <= x; i++){
        const curY = i * y / x;
        answer += Math.ceil(curY) - Math.floor(prevY); 
        prevY = curY;
    }
    return square - answer * divider;
}

// 1. W, H의 최대공약수로 나눠야 함.
//   ex. W=8 H=12면 최대공약수 4로 나누면 W=2, H=3이 되고
//       W=2, H=3일 때 종이를 잘라 못쓰는 사각형의 개수 * 최대공약수 4 = 총 못쓰는 사각형의 수
// 2. 최대공약수로 나눠서 나온 W2, H2 중 더 작은 쪽으로 반복문 시작(1부터 W2 or H2 까지). 더 작은 쪽이 W라고 가정
// 3. W2 * H2 사각형의 대각선 기울기 a를 구해서 y = ax => H = aW
// 4. (W-1)에 매칭되는 H값(prev)과 W에 매칭되는 H값(cur) 비교. 
// 5. Math.ceil(cur)와 Math.floor(prev)의 1의 자리 차이 만큼 answer에 더해줌.
// 6. 반복문 끝나고, 처음 사각형 넓이 - answer * 최대공약수 


