function getDigit(num, i){
	return Math.floor(num / 10 ** i) % 10;
}

function solution(storey) {
    let answer = 0;

    for(let i = 0; i < storey.toString().length; i++){
        const cur = getDigit(storey, i);
        const next = getDigit(storey, i+1);

        if(cur >= 0 && cur <= 4) answer += cur;
        else if(cur >= 6 && cur <= 9) {
            answer += 10 - cur;
            storey += 10 ** (i + 1);
        } else { // cur === 5
            answer += cur;
            if(next >= 5 && next <= 9) storey += 10 ** (i + 1);
        }
    }
    return answer;
}

// 탐욕법
// 각 숫자의 자리수를 순회하면서, 아래로 내려갈지 위로 올라갈지 고민.
// 단, 올라가게 되면 앞 자리수가 하나 올라가는 상황을 고려해야 한다. 1의 자리 -> n의 자리 순으로 순회 ㄱㄱ
// case 1. cur 자리수가 0~4일 때 : 내려감
// case 2. cur 자리수가 6~9일 때 : 올라감, 자리올림
// case 3. cur 자리수가 5일 때 :
//  case 3-1. next 자리수가 5~9일 때 : 올라감, 자리올림
//  case 3-2. next 자리수가 0~4일 때 : 내려감


// 테스트케이스 : 5555
// 5에서 내리기만 함 -> 20번
// 5에서 올리기만 함 -> 5 + 4 + 4 + 4 = 17

// 테스트케이스 : 5255
// 5 + 4 + 3 + 5
// 5 + 5 + 2 + 5
