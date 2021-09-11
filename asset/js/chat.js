export const handleMessage = (data) => {
    const { message, nickname } = data;
    console.log(`${nickname} said ${message}`)
}