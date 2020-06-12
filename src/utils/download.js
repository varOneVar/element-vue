export function download(data) {
	const filename = data.headers['content-disposition'].replace('attachment;fileName=', '')
	if (window.navigator.msSaveOrOpenBlob) {
		navigator.msSaveBlob(new Blob([data.data]), filename)
	} else {
		const url = window.URL.createObjectURL(new Blob([data.data]))
		const link = document.createElement('a')
		link.style.display = 'none'
		link.href = url
		link.setAttribute('download', filename)
		document.body.appendChild(link)
		link.click()
		URL.revokeObjectURL(link.href)
		document.body.removeChild(link)
	}
}

export function downloadNotFileName(blob, filename) {
	if (window.navigator.msSaveOrOpenBlob) {
		navigator.msSaveBlob(blob, filename)
	} else {
		const link = document.createElement('a')
		link.style.display = 'none'

		link.href = URL.createObjectURL(new Blob(blob))
		link.download = filename
		link.click()
		URL.revokeObjectURL(link.href)
	}
}
