import React from 'react';
import { Badge } from './ui/badge';

interface TagsProps {
  words: string[];
}

const Tags: React.FC<TagsProps> = ({ words }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {words.map((word, i) => (
        <Badge
          key={word}
          variant={'outline'}
          className="px-3 py-1 text-base font-semibold cursor-pointer hover:scale-110 transition-transform"
        >
          {word}
        </Badge>
      ))}
    </div>
  );
};

export default Tags;
