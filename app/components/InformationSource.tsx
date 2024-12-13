import React, { useState } from 'react';

function InformationSource() {
    const [selectedSource, setSelectedSource] = useState<string | null>(null);

    const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedSource(value);
        localStorage.setItem('informationSource', value);
    };

    // ... существующий код ...

    return (
        <div>
            <input
                type="radio"
                name="informationSource"
                value="source1"
                checked={selectedSource === 'source1'}
                onChange={handleSourceChange}
            />
            <input
                type="radio"
                name="informationSource"
                value="source2"
                checked={selectedSource === 'source2'}
                onChange={handleSourceChange}
            />
            {/* ... другие радио кнопки ... */}
        </div>
    );
}

export default InformationSource; 