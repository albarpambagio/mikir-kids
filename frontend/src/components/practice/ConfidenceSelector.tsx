import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Emoji } from 'emoji-picker-react';

type ConfidenceLevel = 'agak_ragu' | 'yakin' | 'gampang';

interface ConfidenceSelectorProps {
    onSubmit: (confidence: ConfidenceLevel) => void;
    selectedConfidence?: ConfidenceLevel | null;
}

const ConfidenceSelector: React.FC<ConfidenceSelectorProps> = ({
    onSubmit,
    selectedConfidence = null,
}) => {
    const [selected, setSelected] = React.useState<ConfidenceLevel | null>(selectedConfidence);

    const buttons: { value: ConfidenceLevel; label: string; emoji: string }[] = [
        { value: 'agak_ragu', label: 'Agak Ragu', emoji: '1f615' }, // 😕
        { value: 'yakin', label: 'Yakin', emoji: '1f60a' }, // 😊
        { value: 'gampang', label: 'Gampang', emoji: '1f601' }, // 😁
    ];

    const handleSubmit = () => {
        if (selected) {
            onSubmit(selected);
        }
    };

    return (
        <Card className="w-full p-6 bg-white shadow-lg">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h3 className="text-[20px] font-semibold text-gray-900 mb-1">
                        Seberapa yakin kamu dengan jawabannya?
                    </h3>
                    <p className="text-[14px] text-gray-600">
                        Pilih tingkat keyakinan kamu
                    </p>
                </div>

                {/* Confidence Options - 3 columns with emoji + label */}
                <div className="grid grid-cols-3 gap-4">
                    {buttons.map((button) => (
                        <button
                            key={button.value}
                            onClick={() => setSelected(button.value)}
                            className={`
                flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all
                ${selected === button.value
                                    ? 'border-[#f4881b] bg-[#fff3ea]'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }
              `}
                        >
                            {/* Emoji Icon */}
                            <div className="text-5xl">
                                <Emoji unified={button.emoji} size={48} />
                            </div>

                            {/* Label */}
                            <span className={`text-[16px] font-medium ${selected === button.value ? 'text-[#f4881b]' : 'text-gray-700'
                                }`}>
                                {button.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <Button
                        onClick={handleSubmit}
                        disabled={!selected}
                        className="w-full bg-[#f4881b] hover:bg-[#ea580c] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        Submit
                        <span>▶</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ConfidenceSelector;
