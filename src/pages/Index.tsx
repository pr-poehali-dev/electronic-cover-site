import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  specs: {
    memory?: string;
    processor?: string;
    battery?: string;
    display?: string;
  };
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 34999,
    category: 'audio',
    brand: 'SoundElite',
    rating: 4.9,
    specs: { battery: '30 hours', display: 'Active Noise Cancellation' },
    image: 'https://cdn.poehali.dev/projects/35be6320-5f84-4629-a972-ad4f756ff499/files/28bfe8aa-5f62-4d4e-acb9-33bef1ca3cfc.jpg'
  },
  {
    id: 2,
    name: 'Ultra Slim Laptop Pro',
    price: 149999,
    category: 'computers',
    brand: 'TechCore',
    rating: 4.8,
    specs: { memory: '32GB', processor: 'Intel Core i9', display: '16" Retina' },
    image: 'https://cdn.poehali.dev/projects/35be6320-5f84-4629-a972-ad4f756ff499/files/ca866eee-84f0-4054-8e88-f4970e5f012c.jpg'
  },
  {
    id: 3,
    name: 'Flagship Smartphone X',
    price: 89999,
    category: 'phones',
    brand: 'MobileX',
    rating: 4.7,
    specs: { memory: '256GB', processor: 'Snapdragon 8 Gen 3', display: '6.7" AMOLED' },
    image: 'https://cdn.poehali.dev/projects/35be6320-5f84-4629-a972-ad4f756ff499/files/d01b51b0-97f4-47b6-8a22-65bf6d9ae75e.jpg'
  }
];

const Index = () => {
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(true);

  const categories = ['audio', 'computers', 'phones'];
  const brands = ['SoundElite', 'TechCore', 'MobileX'];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchesPrice && matchesCategory && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">PREMIUM ELECTRONICS</h1>
            <nav className="flex items-center gap-8">
              <button className="text-sm font-medium hover:text-accent transition-colors">Главная</button>
              <button className="text-sm font-medium hover:text-accent transition-colors">Каталог</button>
              <button className="text-sm font-medium hover:text-accent transition-colors">О нас</button>
              <Button variant="ghost" size="icon">
                <Icon name="ShoppingCart" size={20} />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative h-[600px] bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90" />
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h2 className="text-6xl font-bold mb-6 leading-tight">
              Технологии<br />премиум класса
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 font-light">
              Откройте для себя коллекцию эксклюзивной электроники,<br />
              где каждая деталь продумана до совершенства
            </p>
            <Button size="lg" variant="secondary" className="text-base px-8">
              Смотреть каталог
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-4xl font-bold mb-2">Каталог</h3>
            <p className="text-muted-foreground">Найдено {sortedProducts.length} товаров</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Icon name="SlidersHorizontal" size={16} />
              {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {showFilters && (
            <aside className="w-80 flex-shrink-0 space-y-8 animate-in fade-in slide-in-from-left duration-300">
              <Card className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="DollarSign" size={18} />
                  Цена
                </h4>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200000}
                    step={1000}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0].toLocaleString()} ₽</span>
                    <span>{priceRange[1].toLocaleString()} ₽</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Grid3x3" size={18} />
                  Категория
                </h4>
                <div className="space-y-3">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={category}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer capitalize"
                      >
                        {category === 'audio' ? 'Аудио' : category === 'computers' ? 'Компьютеры' : 'Телефоны'}
                      </label>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Tag" size={18} />
                  Бренд
                </h4>
                <div className="space-y-3">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <label
                        htmlFor={brand}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </Card>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange([0, 200000]);
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                }}
              >
                Сбросить фильтры
              </Button>
            </aside>
          )}

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map(product => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase text-muted-foreground tracking-wider">
                          {product.brand}
                        </span>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="fill-accent text-accent" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold leading-tight">{product.name}</h4>
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex items-start gap-2">
                          <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{product.price.toLocaleString()} ₽</span>
                        <Button size="sm" className="gap-2">
                          <Icon name="ShoppingCart" size={16} />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border bg-card mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PREMIUM ELECTRONICS</h3>
              <p className="text-sm text-muted-foreground">
                Эксклюзивная электроника премиум класса
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Аудио</li>
                <li>Компьютеры</li>
                <li>Телефоны</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Доставка</li>
                <li>Гарантия</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@premium.ru</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
