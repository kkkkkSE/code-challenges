function solution(arr) {
    const ban = new Array(arr.length).fill().map(v => new Array(arr.length).fill(false));
    let countZero = 0;
    let countOne = 0;

    // 큰 범위부터 압축 가능한지 체크
    for(let i = arr.length; i >= 2; i /= 2){

        for(let a = 0; a < arr.length; a += i){
            for(let b = 0; b < arr.length; b += i){
                if(ban[b][a]) continue; // 압축된 구간 건너띄기
                const num = arr[b][a];

                outer : for(let j = a; j < a + i; j++){
                    inner : for(let k = b; k < b + i; k++){
                        if(num !== arr[k][j]) break outer;
                        if((j === (a + i - 1)) && (k === (b + i - 1))) {
                            if(num === 1) countOne++;
                            else countZero++;

                            // 압축된 곳은 못 돌게 표시
                            for(let l = a; l < a + i; l++){
                                for(let m = b; m < b + i; m++){
                                    ban[m][l] = true;
                                }
                            }

                        }
                    }
                }

            }
        }
    }

    // 압축되지 않은 숫자 세기
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){
            if(ban[j][i]) continue;
            if(arr[j][i] === 1) countOne++;
            else countZero++;
        }
    }
    
    return [countZero, countOne];
}