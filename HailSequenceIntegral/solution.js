function solution(k, ranges) {
  const arr = [k], integral = [];
  let y = k;
  let i = 0;

  while(y > 1){
    if(y % 2 === 1) y = 3 * y + 1;
    else y = y / 2;

    arr.push(y);

    integral.push(
      Math.min(arr[i], arr[i+1]) + (Math.abs(arr[i]-arr[i+1]) / 2)
    );

    i++;
  }

  const xMax = arr.length - 1;

  return ranges.map((v) => {
    const start = v[0], end = xMax + v[1];
    let result = 0;

    if(start > end) result = -1;
    else {
      for(let i = start; i < end; i++) {
        result += integral[i];
      }
    }

    return result;
  })
}

// 문제 : x = a ~ b 구간을 정적분하라. 
//       단, b는 가장 마지막 x를 기준으로 오프셋을 나타내므로 음수이다.

// 1. x좌표에 대한 y값을 배열에 저장한다. x는 index, 배열 요소의 값은 y를 의미한다.
// 2. 1번 과정에서 y가 추가될 때마다 직전 x값과 현재 x값 사이 넓이를 계산하고, integral 배열에 넣는다.
//    만약 x = 0 일때 y = 5, x = 1 일때 y = 16이었다면 integral[0]에는 x = 0 ~ 1 사이의 넓이인 10.5가 저장된다.
// 3. ranges를 순회하면서, 시작점과 끝점 사이 구간을 정적분 한다. 
// 4. 예외로, 주어진 범위가 정상적인 범위를 벗어날 경우는 -1을 return 한다.