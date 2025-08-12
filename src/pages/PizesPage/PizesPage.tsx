import { Prizes } from '@/entities/prizes';

import cls from './PizesPage.module.scss';

const PizesPage = () => {
  return (
    <section className={cls.PizesPage}>
      <Prizes />
    </section>
  );
};

export default PizesPage;
