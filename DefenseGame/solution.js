function solution(n, k, enemy) {
  const heap = [];
  let round = 0;

  // 최소 힙에 push 후 시행할 bubbleUp
  function bubbleUp(cur) {
    let curIdx = heap.length - 1;

    while(curIdx > 0) {
      let parentIdx = Math.floor((curIdx - 1)/2);
      let parent = heap[parentIdx];

      if(cur > parent) break;

      heap[parentIdx] = cur;
      heap[curIdx] = parent;
      curIdx = parentIdx;
    }
  }

  // 최소 힙의 max 무적권 사용 후 시행할 sinkdown
  function sinkDown() {
    let curIdx = 0;
    let cur = heap[0];
    let len = heap.length;

    heap[0] = cur;

    while(true){
      let child1Idx = curIdx * 2 + 1;
      let child2Idx = curIdx * 2 + 2;
      let child1, child2;
      let swap = null;

      if(child1Idx < len){
        child1 = heap[child1Idx];
        if(child1 < cur) swap = child1Idx;
      }
      if(child2Idx < len){
        child2 = heap[child2Idx];
        if((swap !== null && child2 < child1) || (swap === null && child2 < cur)) {
          swap = child2Idx;
        }
      }
      if(swap === null) break;
      heap[curIdx] = heap[swap];
      heap[swap] = cur;
      curIdx = swap;
    }
  }

  while(n > 0 && round < enemy.length){
    const cur = enemy[round];

    if(heap.length < k) {
      heap.push(cur);
      bubbleUp(cur);
    }
    else {
      const min = heap[0];

      if(cur > min){
        n -= min;
        heap[0] = cur;
        sinkDown();
      }else{
        n -= cur;
      }
    }
    
    if(n < 0) return round;

    round++;
  }

  return round;
}


// enemy를 순서대로 순회하면서(while문) 할 일
// -> n 감소, answer 증가, 무적권 사용할지 체크

// 무적권을 사용할 heap 배열을 만들고, 우선순위 큐로 이용한다.
// 큐에 원소가 추가될 때마다 정렬하고, 개수 k개를 초과할 경우에는 가장 끝에있는(가장 작은)원소와 현재 원소를 비교한다.
// 비교하여 큐의 원소가 더 작다면 제거하고, 아니면 통과한다.
// -> 이 과정에서 kArr에 추가된 원소는 n에서 감소시키지 않으며,
//    kArr의 개수가 초과하여 원소를 제거할 경우에 제거된 원소만큼 n을 감소시킨다.

// //// 우선순위 큐 첫번째 시도 실패 -> 이진 힙의 정렬 방식 적용 시 성공

// function solution(n, k, enemy) {
//   const heap = [];
//   let idx = 0;

//   // 우선순위 큐로 만들기 위한 내림차순 정렬 과정
//   function pushEl(cur) {
//     if(heap.length < k) heap.push(cur);
//     else heap[k - 1] = cur;
    
//     const len = heap.length;

//     if(len < 2) return;

//     let nextIdx = len - 2;
//     let next = heap[nextIdx];

//     while(next < cur){
//       heap[nextIdx] = cur;
//       heap[nextIdx + 1] = next;
      
//       nextIdx--;

//       if(nextIdx < 0) return;

//       next = heap[nextIdx];
//     }
//   }

//   while(n > 0 && idx < enemy.length){
//     const cur = enemy[idx];

//     if(heap.length < k) pushEl(cur);
//     else {
//       const last = heap.at(-1);

//       if(cur > last){
//         pushEl(cur);
//         n -= last;
//       }else{
//         n -= cur;
//       }
//     }
    
//     if(n < 0) return idx;

//     idx++;
//   }

//   return idx;
// }

