function solution(data, col, row_begin, row_end) {
  let answer = 0;

  data.sort((a, b) => {
    const el1 = a[col-1], el2 = b[col-1];
    return el1 !== el2 ? (el1 - el2) : (b[0] - a[0]);
  })

  for(let i = row_begin; i <= row_end; i++){
    const s_i = data[i-1].reduce((a, c) => a + (c % i), 0);
    answer ^= s_i;
  }

  return answer;
}

// 1. col 번째 열의 값을 기준으로 오름차순 정렬, 두번째 기준은 1번째 열 내림차순
// 2. row_begin ~ row_end를 차례로 순회하면서 각 row에 대한 S_i를 구한다.
//    S_i는 해당 행 index의 모든 원소에 대한 값을 i로 나눈 나머지의 합
// 3. 모든 S_i에 대해 접근하여 차례로 bitwise XOR( ^ ) 연산
