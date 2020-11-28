import { Provider as Respite } from '../src/@drongo/respite';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'fullscreen',
}

export const decorators = [
  (Story) => (
    <Respite>
      <Story/>
    </Respite>
  ),
];
