import React from 'react';
import Button from 'ui/elements/Button';
import { Kind } from 'ui/theme';
import TextInput, { Suffix, Prefix } from './';
export { default } from './TextInput.stories';

export const backstop = () => (
  <div>
    <div>
      <TextInput value="default"/>
    </div>
    <div>
      <TextInput placeholder="placeholder text"/>
    </div>
    <div>
      <TextInput value="I am invalid" hasError/>
    </div>
    <div>
      <TextInput
        value="500"
        prefix={(
          <Prefix>{'£'}</Prefix>
        )}
      />
    </div>
    <div>
      <TextInput
        value="500"
        suffix={(
          <Suffix>{'£'}</Suffix>
        )}
      />
    </div>
    <div>
      <TextInput
        value="500"
        prefix={(
          <Prefix>{'£'}</Prefix>
        )}
        suffix={(
          <Suffix>{'pounds'}</Suffix>
        )}
      />
    </div>
    <div>
      <TextInput
        value="500"
        prefix={(
          <Button kind={Kind.CTA}>£</Button>
        )}
        suffix={(
          <Button kind={Kind.SECONDARY}>pounds</Button>
        )}
      />
    </div>
  </div>
);
