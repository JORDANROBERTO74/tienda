import React from 'react'
import { storeData } from '@/components/fakeData/storeData'

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted mt-12">
      <div className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Acerca de Nosotros</h3>
            <p className="text-muted-foreground">
              {storeData?.aboutUs?.description2}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <div className="text-muted-foreground">
              <p>FAQ</p>
              <p>Shipping</p>
              <p>Returns</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
            <p className="text-muted-foreground">
              {`Email: ${storeData?.contact?.email}`}
            </p>
            <p className="text-muted-foreground">
              {`Teléfono: ${storeData?.contact?.phone}`}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 pb-4 border-t text-center text-muted-foreground">
          © 2024 FashionStore. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
