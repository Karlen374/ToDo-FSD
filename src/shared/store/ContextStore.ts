class ContextStore<T> {
	private subsribers: Set<() => void> = new Set();// колбэки для вызова потом 
	private store: T;//наш стор 

	constructor(initialStore: T) {
		this.store = initialStore;
	}

	getStore = () => {
		return this.store;
	};

	subscribe = (subscribeCB: () => void) => {
		this.subsribers.add(subscribeCB);// добавляем подписчика
		
		return () => {
			this.subsribers.delete(subscribeCB);
		};
	};

	updateStore = (newStorePart: Partial<T>) => {//получаем ту часть которую надо обновить
		this.store = { ...this.store, ...newStorePart };

		this.subsribers.forEach((subsriber) => {//обновление всех подписчиков
			subsriber();
		});
	};

}

export default ContextStore;