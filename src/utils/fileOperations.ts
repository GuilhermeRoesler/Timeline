export const exportTimeline = async () => {
    const data = {
        periods: JSON.parse(localStorage.getItem('periods') || '[]'),
        events: JSON.parse(localStorage.getItem('events') || '[]'),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
    });

    try {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'timeline.json',
            types: [
                {
                    description: 'Arquivo JSON',
                    accept: {
                        'application/json': ['.json'],
                    },
                },
            ],
        });

        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
    } catch (err) {
        console.error('Operação de exportação cancelada ou erro:', err);
        throw err;
    }
};

export const importTimeline = async () => {
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: 'Arquivo JSON',
                    accept: {
                        'application/json': ['.json'],
                    },
                },
            ],
        });

        const file = await fileHandle.getFile();
        const contents = await file.text();
        const data = JSON.parse(contents);

        // Validação básica
        if (!data.periods || !data.events) {
            throw new Error('Formato de arquivo inválido');
        }

        localStorage.setItem('periods', JSON.stringify(data.periods));
        localStorage.setItem('events', JSON.stringify(data.events));
        alert('Linha do tempo importada com sucesso!');
        window.location.reload();
    } catch (err) {
        console.error('Operação de importação cancelada ou erro:', err);
        throw err;
    }
};