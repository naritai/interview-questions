class MinHeap {
	constructor(heapSize = 0) {
		this.heapSize = heapSize;
		this.realSize = 0;
		this.heap = [0];
	}

	add(element) {
		this.realSize++;

		if (this.realSize > this.heapSize) {
			console.log('Added too many elements');
			this.realSize--;
			return;
		}

		this.heap.push(element);

		let index = this.realSize;
		let parentIndex = Math.floor(index / 2);

		if (this.heap[index] < this.heap[parentIndex] && index > 1) {
			const temp = this.heap[parentIndex];
			this.heap[parentIndex] = this.heap[index];
			this.heap[index] = temp;
			index = parentIndex;
			parentIndex = Math.floor(index / 2);
		}
	}

	pop() {
		if (this.realSize < 1) {
			console.log('There is no element to remove.');
			return;
		}

		const removeElement = this.heap[1];

		// place the last added element to the removed place (root)
		this.heap[1] = this.heap[this.realSize];
		this.realSize--;
		this.heap.pop(); // JS specific. We have to remove elem from an array

		let index = 1;

		// when the deleted element (by index) is not the leaf node
		// we have to do additional checks with deleted node's children
		while (index <= Math.floor(this.realSize / 2)) {
			let left = this.heap[index * 2];
			let right = this.heap[index * 2 + 1];

			if (this.heap[index] > this.heap[left] || this.heap[index] > this.heap[right]) {
				// this.heap[right] can be undefined
				if (this.heap[right] === undefined || this.heap[left] < this.heap[right]) {
					// swap index with left (smalles)
					const temp = this.heap[left];
					this.heap[left] = this.heap[index];
					this.heap[index] = temp;
					index = left;
				} else {
					// swap index with right (smalles)
					const temp = this.heap[right];
					this.heap[right] = this.heap[index];
					this.heap[index] = temp;
					index = right;
				}
			} else {
				break;
			}
		}

		return removeElement;

	}

	peek() {
		return this.heap[1];
	}

	size() {
		return this.realSize;
	}

	toString() {
		if (this.realSize < 1) {
			console.log('There is no elements');
		} else {
			console.log(this.heap);
		}
	}
}

const minHeap = new MinHeap(5);

console.log(minHeap.size());
minHeap.add(3);
minHeap.add(1);
minHeap.add(2);
minHeap.toString();
console.log(minHeap.peek());
minHeap.pop();
minHeap.toString();












