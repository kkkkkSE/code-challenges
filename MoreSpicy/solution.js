function solution(scoville, K) {
  let answer = 0;

  scoville.sort((a,b) => a - b);

  if(scoville[0] >= K) return 0;

  // 새 요소 push 후 최소 이진 힙 정리
  function insert(element){
    scoville.push(element);

    let idx = scoville.length - 1;
  
    while(idx > 0){
        let parentIdx = Math.floor((idx - 1)/2);
        let parent = scoville[parentIdx];

        if(element >= parent) break;

        scoville[parentIdx] = element;
        scoville[idx] = parent;
        idx = parentIdx;
    }
  }


  // 최소값 추출과 동시에 최소 이진 힙 정리
  function extractMin(){
    const min = scoville[0];
    const end = scoville.pop();

    if(scoville.length <= 0) {
      return end;
    }

    scoville[0] = end;

    const length = scoville.length;
    const element = scoville[0];
    let idx = 0;

    while(true){
        let child1Idx = idx * 2 + 1;
        let child2Idx = idx * 2 + 2;
        let child1, child2;
        let swapIdx = null;

        if(child1Idx < length) {
            child1 = scoville[child1Idx];
            if(child1 < element){
                swapIdx = child1Idx;
            }
        }
        if(child2Idx < length) {
            child2 = scoville[child2Idx];
            if(
                (swapIdx !== null && child2 < child1) || 
                (swapIdx === null && child2 < element)
            ){
                swapIdx = child2Idx;
            }
        }

        if(swapIdx === null) break;

        scoville[idx] = scoville[swapIdx];
        scoville[swapIdx] = element;
        idx = swapIdx;
    }
    
    return min;
  }
  
  while(scoville.length > 1){
    const min = extractMin();
    const nextMin = extractMin();

    insert(min + (nextMin * 2));
    
    answer++;

    if(scoville[0] >= K) {
      return answer;
    }
  }

  return -1;
}