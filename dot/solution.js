function solution(k, d) {
    let answer = 0;

    for(let x = 0; x <= d; x += k){
        const rangeMax = Math.floor(Math.sqrt(d ** 2 - x ** 2));
        const dotCount = Math.floor(rangeMax / k);

        answer += dotCount + 1;
    }
    return answer;
}

// 1. for(let x = 0; x <= d; x += k) 로 순회하기
// 2. y 값으로 가능한 범위의 최대값를 찾기. 원점에서부터 (x, y)의 거리 distance는 d보다 같거나 작아야 함.
//    -> x^2 + y^2 = distance^2 <= d^2  ==> y <= 루트(d^2 - x^2)
// 3. 2번에서 도출한 식으로 y*k 범위의 최대값 구하기
// 4. 3번에서 나온 값에서 k로 나누고 내림하면 y의 개수가 나온다. 원점은 제외돼있어서 +1 해줘야함
// 5. 카운트 한 점의 개수 answer에 더함