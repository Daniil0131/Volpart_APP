// components/ui/location/location.tsx
import './location.css';
import bus from '../../../assets/icon_bus.png'
import three from '../../../assets/icon_three.png'
import medic from '../../../assets/icon_medic.png'
import studyman from '../../../assets/icon_studyman.png'
export function Location() {
  return (
    <section className="location">
      <h2 className="location__title">Расположение апартаментов</h2>

      <div className="location__grid">
        <div className="location__item">
          <img src={bus} alt="Волпарт" className="header__logo" />
          <div>
            <h3 className="location__item-title">Транспортная доступность</h3>
            <p className="location__text">
              Удобное расположение позволяет легко добраться до любой точки города.
            </p>
          </div>
        </div>

        <div className="location__item">
          <img src={three} alt="Волпарт" className="header__logo" />
          <div>
            <h3 className="location__item-title">Места для прогулок</h3>
            <p className="location__text">
              В шаговой доступности парки для прогулок и зоны отдыха.
            </p>
          </div>
        </div>

        <div className="location__item">
          <img src={medic} alt="Волпарт" className="header__logo" />
          <div>
            <h3 className="location__item-title">
              Близость к медицинским учреждениям
            </h3>
            <p className="location__text">
              Апартаменты расположены в районе с хорошей медицинской инфраструктурой.
            </p>
          </div>
        </div>

        <div className="location__item">
          <img src={studyman} alt="Волпарт" className="header__logo" />
          <div>
            <h3 className="location__item-title">
              Доступность образовательных учреждений
            </h3>
            <p className="location__text">
              Рядом находятся школы и другие образовательные учреждения.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}