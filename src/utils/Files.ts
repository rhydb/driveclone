
export enum FileType {
    file = "file",
    folder = "folder",
    image = "image",
    video = "video",
    audio = "audio",
    text = "text",
    pdf = "pdf",
    archive = "archive",
}

export const extractExtension = (name: string) => {
    if (name.endsWith("/")) {return "/";}
    const match = /\.([^.]+?)$/.exec(name);
    return match?.[1] ?? "";
}

export const typeFromExtension = (extension: string) => {
    if (extension === "/") {return FileType.folder;}
    if (extension === "") {return FileType.file}
    const archive = ["zip", "tar", "gz", "rar"];
    const image = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    const video = ["mp4", "mpeg", "mov", "avi"];
    const audio = ["mp3", "wav", "ogg"];
    const text = ["txt", "c", "cpp", "py", "html", "php", "js", "css", "html", "ts", "md"];
    const pdf = ["pdf"];

    if (archive.includes(extension)) {return FileType.archive}
    if (image.includes(extension)) {return FileType.image}
    if (video.includes(extension)) {return FileType.video}
    if (audio.includes(extension)) {return FileType.audio}
    if (text.includes(extension)) {return FileType.text}
    if (pdf.includes(extension)) {return FileType.pdf}
    return FileType.file;
}