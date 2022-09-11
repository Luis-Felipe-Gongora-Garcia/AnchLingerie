import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { BabyDoll, InitialPage, Sets, Sweaters } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  const iconConjuntos =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAEK0lEQVRIie2Va0zTVxyG3/bfFlvayq3cS2kLhVKuVjq5DRlxhEsWg9myOGU63VCMGzqnjgXBBZ2bOFwg6jYz3cxwIC4IkTIGUS6ClTFZNh0YYJDIpUpb2tIChXL2wYm3fXBh+7Bl78eTc54n7zn55QD/ibDZ7Hh/ScAdaWBwPQDaIlC08Ehlm0yuMPF4vPiFVbkivK62sZWERal0ADwWIfCIT0y2V9a1kJCwCDUA0AGAQTEcCI0FOoMxC4BahIBis9mwgQUajWItCP7J/C94OgGXxzdzuNy/gzexbuPr9icE5Rcaq8dNM9CN3BaESGX9gf6SHgDOfwHsEiSR9oYFBumOvJ/PvHnzF9DotAe3s6vw8EkvHyFJi0sko+frSXn+QeIvFKkByJ8CLpf4+TVUFHxARqrUJD0ukXB5fBIZHasB7k2th69QNHD5ahenvaUZxUX7kbkiHv2jw3ad0WS/NTzU3Tc4EAvA/hiYkoklHUFC/wgXHo8Se3pTVR1tyNyahxBlAvZmJZsH+3pF9ITlMWUHNm3lOOmM4Dg6oqG9ExY3Zwxpx6hj23ewEsKilABeAcB4CM4AsG5lhFJZmpPLGtSOUUYXVxw42wqWAweVB3di3mzmxSqf+QzLgxVT5rpmYq1vIxtSMsiKSCW52t1DztS0EEWwgpS9tZu8uCptWuTjpwXgA8BX7OunfTklfbr0zXdIuFxBvrvcTrpu9JMEVQLZ9Fwa6Sg8SixfXCDKIMUUwzo9zeKyOQCAU3sL0NndjVczX8DOj47j0OkavLd5DQ5lveawLWO1e3Htt1uc+HzblqTn3Y0WCwq++RJf16gxONCPjWsycGJ9DmJEgQs17XNzLDoBeVDcMo1ogRAXt+fh6J4czNpmUHK2Hu+eOQUmReHk4RNDnxcdGQWAwoqvUKluxJTVit3b3kD1vkOIkYc+8kjzZJ7QlgWHTpzbV7RU4u4FaA2477ty6wZ2XDyHY9UtuDs2gty1qbZxnTaAz+JTHCd2b1VdI8vTyxsZK2NRsiEbqmAFYJgErDMAgGGDDpnHPzTQdSZ9XllVBWCy4uEycTIFArhLca21CQJPb6iSU216vV45ODYYlZSSavP08kbzpSb48Pj34AAwN79wvlh9HmMG/R7KaDb/cMdkynRxYHtECMWPVHRhc1B+SY1n0zLJx4Vvt0zox5UAort/7BImJiUzxW4C2kuyUDguYQOEAEYrAOB02/eo+qnzds9vfevv/14cqVDUEOUnVeUmpzNV0iAwKQb6tCNYVbJ/vlLTu1rls6QWgOyP2TG7uro1Z6/N8tsck8gSe3nDarVCc0WD0qZajFgnf9X8fF0JYOrx7zE2WCzLn7XNLKPT6TQGRY3fNeg+GTcaPsWTYQqcnbPdBe45k5MWT0cOFzwev0dz/douAO1/sv9fmt8BtZ6QlLDVDccAAAAASUVORK5CYII=';

  const iconBabyDoll =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACqUlEQVRIidWVTWsUQRCGn+qe/XCz2cSIm4DZxKCIgl8BT6KCSC7iRQQFf4UHf4BXT94M+QF6ECEXL4IgiHrwIKh4UPELRTHG3SQbd2cyM10e1phkZnRX8GLBQFP9dj3VRVUPZJjO3NytM7NXsvay9bNXdObm7qw9k31ESkClV0BHK6W/APw7+/8BknT4D57tsL7/VJwWnZFm4Hm3y8cOnheReL1ObzzPL4+E14sr0ZSoK6sRP84P7Cse3fXmjzdwUXTdM5SsJyZnGCi76Ky78yhYuP9salWzeP/pSTe03CrH4RnPasVaMV4cldravpyM56UcUbgHIxA58Fc6WeQ9W/Fbtz88fFEr+n65P/BviTWCKjTb8D0A5zBVb39XAIoDoN6EMFqrpREpVXOzfSYeEyOCczC/BOFa5dSloqVL1Lb5eyy1NgTv1E6p1BuHCqrDnQSWNwQHCPsKd7sClgpbzn23+VY6F1jcukUCY8EPIQg3Jlbpby2P9l9InkmVqHa41n7dDF5u+jR/cOjVe/KLTfz+PubGt/F1fBSA6ruPbA1jis0WUSFPY6TKp53br02O9PldAQCxmMV4bJivY8N8Xknvf5mo8WWilvDKx6xYmYOmIt/+KMgwgXrvACX362BqFH9rmdXIBBj010uq2jNgoGeArBNntHamKW6wZ4AVUwNY7fK5aG39e5M9PQM8o5uh81oAVD2wCU07fbXJngDPl/SI/PSvzvJclFTBXBpQfdzQ8a6AvNWLq+vAQaQQJkWAUYgTDRAbd7orwBp3AjqHAwehQi6jVQctqb+JoueSug2SJws6MVSI3zigHnaCK52vx4HTnLNDk5tlIfMGBwblbcvppXpsJ0OJ9wLTBhoG5oGr4vS4OD0OXAXmBRrANCbea9TuFDi1PjjADzqoBRbKhhV5AAAAAElFTkSuQmCC';

  const iconCamisola =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABdElEQVRIieVUvUvDcBB9l9RU/OiQgquDHUWQop3aqYujxC6O7nar6NbZYgfxXxAnV8XF0c0/IKDuGqHFYmnIxzkFVPzdRVAcvPHuvXvv7n4J8NfR8INu3Q/4c77uB9zwg67Gt37H1r8ScAdDp93vgVtdJ8vxxm6x3e/BHQwdiZsrHqrNpwDgsdfxstx4q9MKAL6vNh81PmmAV29vBGAOQAjQKZgJhG0ARQJGM+eHJYlfUEdI4qv47tYDUASw8740VVm90OjqDSyMT2h6FmkUIo0mSKMJOIlB8y5QsI41vjoB26UVe3EZ9lfFlKsAbmSDanDNXCOhllOAhSZMUAXEV/SyeVC2rSQQcJw4yULp7OjZ1EOcwLbimmKC7KiwJvWQV0S0LtYByDfSb6DuGAzRhFGAAQJDHD8zwcIajQKh16kAKOcQcMPW/tK3BWJY+noyLKdGrFGAlON9xJq/FeHI+QWQmrHCv8i6JPB1nv5MFOY289PxBsFGbDlVuzSnAAAAAElFTkSuQmCC';

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Página inicial',
        path: '/pagina-inicial',
      },
      {
        html: iconConjuntos,
        label: 'Conjuntos',
        path: '/conjuntos',
      },
      {
        html: iconBabyDoll,
        label: 'BabyDoll',
        path: '/babydoll',
      },
      {
        html: iconCamisola,
        label: 'Camisolas',
        path: '/camisolas',
      },
      {
        icon: 'location_on',
        label: 'Localização',
        path: '/localizacao',
      },
      {
        icon: 'gpp_good',
        label: 'Politicas',
        path: '/politicas',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<InitialPage />} />
      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
      <Route
        path='/localizacao'
        element={<Button variant='contained'>Ola</Button>}
      />
      <Route
        path='/politicas'
        element={<Button variant='contained'>politicas</Button>}
      />
      <Route path='/babydoll' element={<BabyDoll />} />
      <Route path='/conjuntos' element={<Sets />} />
      <Route path='/camisolas' element={<Sweaters />} />
    </Routes>
  );
};
