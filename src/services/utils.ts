

// 等待时长
export const waitTime = (time: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}