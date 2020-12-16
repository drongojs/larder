import { renderHook } from '@testing-library/react-hooks';
import { Formik } from 'formik';
import { usePreview } from './';

describe('usePreview', () => {
  it('returns the adjusted quantity', () => {
    const { result } = renderHook(() => {
      return usePreview(250, 'g', false);
    }, {
      wrapper: Formik,
      initialProps: {
        initialValues: {
          amount: '500',
        },
      },
    });

    expect(result.current.quantity).toBe(750);
  });
  describe('when the unit is different', () => {
    it('converts the amount to the base unit', () => {
      const { result } = renderHook(() => {
        return usePreview(250, 'g', false);
      }, {
        wrapper: Formik,
        initialProps: {
          initialValues: {
            amount: '0.5kg',
          },
        },
      });
  
      expect(result.current.quantity).toBe(750);
    });
  });
  describe('when negate is true', () => {
    it('subtracts the adjustment', () => {
      const { result } = renderHook(() => {
        return usePreview(1000, 'g', true);
      }, {
        wrapper: Formik,
        initialProps: {
          initialValues: {
            amount: '500',
          },
        },
      });
  
      expect(result.current.quantity).toBe(500);
    });
  });
  it('returns the unit', () => {
    const { result } = renderHook(() => {
      return usePreview(500, 'g', false);
    }, {
      wrapper: Formik,
      initialProps: {
        initialValues: {
          amount: '1kg',
        },
      },
    });

    expect(result.current.quantity).toBe(1500);
    expect(result.current.unit).toBe('kg');
  });
});
