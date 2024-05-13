import './App.css'
import Article from './components/Article'
import DirectoryTreeView from './components/DirectoryTreeView'
import Callout from './components/Callout'
import Footer from './components/Footer'
import H1 from './components/H1'
import H2 from './components/H2'
import H3 from './components/H3'
import Link from './components/Link'
import P from './components/P'
import { CopyBlock, atomOneDark } from 'react-code-blocks'

const pathDatabaseSeeder = {
  name: "",
  children: [
    {
      name: "app",
      children: [
        {
          name: "database", children: [
            {
              name: "sedeers", children: [
                { name: "DatabaseSeeder.php" }
              ]
            }
          ]
        }
      ],
    },
  ],
}

const pathLivewireComponentClass = {
  name: "",
  children: [
    {
      name: "app",
      children: [
        {
          name: "Livewire",
          children: [
            {
              name: "SearchUsers.php",
            }
          ]
        }
      ],
    },
  ],
}

const pathLivewireComponentView = {
  name: "",
  children: [
    {
      name: "resources",
      children: [
        {
          name: "views",
          children: [
            {
              name: "livewire",
              children: [
                {
                  name: "search-users.blade.php"
                }
              ]
            }
          ]
        }
      ],
    },
  ],
}

function App() {

  return (
    <>
      <H1 text='Como usar meilisearch junto con livewire' />
      <Article>
        <div className='pb-12'>
          <H2 text='Crear el proyecto' />
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text='laravel new recetas' />
        </div>

        <div className='pb-12'>
          <H2 text='Actulizar el .env' />
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`DB_DATABASE=recetas
DB_USERNAME=root
DB_PASSWORD=root@2410`} />
        </div>

        <div className='pb-12'>
          <H2 text='Crear la base de datos' />
          <P>Ya sea con el PhpMyAdmin, Sequel Pro etc...</P>
        </div>

        <div className='pb-12'>
          <H2 text='Ejecutar la migración' />
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`php artisan migrate`} />
        </div>

        <div className='pb-12'>
          <H2 text='Ejecutar seeders' />
          <P>En mi caso, modifiqué el seeder para poder generar 100 users aletorios</P>
          <P>app/database/seeders/DatabaseSeeder.php</P>
          <DirectoryTreeView folder={pathDatabaseSeeder} />

          <P>Ejecuto el seeder</P>

          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`php artisan db:seed`} />
        </div>

        <div className='pb-12'>
          <H2 text='Instalar scout' />
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`composer require laravel/scout`} />
        </div>

        <div className='pb-12'>
          <H2 text='Implementar Searchable en el Modelo' />
          <P>En mi caso, el filtrado va a ser de los users. Por lo tanto me dirijo al modelo User</P>
          <P>Añado las siguientes líneas</P>

          <CopyBlock
            language='php'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`<?php

use Laravel\\Scout\\Searchable;

class User extends Authenticatable
{
    use Searchable;

  /*
  Cuando el user haga un filtrado, estos son los datos
  que meilisearch va a retornar(id incluida).
  */
	public function toSearchableArray()
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
        ];
    }
}            
`} />
        </div>

        <div className='pb-12'>
          <H2 text='Instalar meilisearch' />
          <P>En mi caso, al tener s.o de mac, es de esta manera</P>
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            customStyle={{ marginBottom: '20px' }}
            text={`brew update && brew install meilisearch`} />
          <P>Os dejo este enlace para saber las diferentes formas de instalar meilisearch según el sistema operativo que tengas</P>
          <Link text='https://www.meilisearch.com/docs/learn/getting_started/installation' href='https://www.meilisearch.com/docs/learn/getting_started/installation' />
          <Callout text='Aún no ejecutéis el comando del #launch' />

        </div>

        <div className='pb-12'>
          <H2 text='Ejecutamos Meilisearch' />
          <P>En el caso del s.o mac se hace con el comando</P>
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            customStyle={{ marginBottom: '20px' }}
            text={`meilisearch`} />

          <P>Os dejo el siguiente enlace donde podéis ver las diferentes formas de ejecutarlo, ya sea que tengas Windows, Linux etc..</P>
          <Link text='https://www.meilisearch.com/docs/learn/getting_started/installation' href='https://www.meilisearch.com/docs/learn/getting_started/installation' />
          <P>Buscar el apartado de #launch</P>

          <Callout text='Importante. Al ejecutar el meilisearch,os habrá generado una master key en la terminal' />
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            customStyle={{ marginBottom: '20px' }}
            text={`--master -key clave`} />

          <P>Guardaros es clave en algún lado, más delante la utilizaremos.</P>
          <Callout text='Por el momento no cerréis la terminal donde habéis ejecutado el comando meilisearch. Ya os avisaré cuando tengais que cerrarla' />
        </div>

        <div className='pb-12'>
          <H2 text='Instalar ScoutServiceProvider' />
          <P>Abrimos una nueva terminal</P>
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`php artisan vendor:publish —provider="Laravel\\Scout\\ScoutServiceProvider"`} />
        </div>

        <div className='pb-12'>
          <H2 text='Actualizar el .env' />
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`SCOUT_DRIVER=meilisearch

MEILISEARCH_KEY="pegar key generada del comando melisearch"`} />
        </div>

        <div className='pb-12'>
          <H2 text='Volver a ejecutar meilisearch con master key' />
          <P>Vamos a cerrar la terminal de meilisearch. Y vamos a ejecutar:</P>

          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`meilisearch --master-key="key generada de antes"`} />
        </div>

        <div className='pb-12'>
          <H2 text='Instalar meilisearch-php' />
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`composer requiremeilisearch/meilisearch-php`} />
        </div>

        <div className='pb-12'>
          <H2 text='Importar los users de la bd a meilisearch' />
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`php artisan scout:import "App\\Models\\User"`} />
        </div>

        <div className='pb-12'>
          <H2 text='Acceder a meilisearch' />
          <P>Accedo desde el navegador a la siguiente URL:</P>
          <strong>localhost:7700</strong>
          <P>Me preguntará por una key, tengo que pegar la key que se me había generada con el comando meilisearch</P>
          <Callout text='Recomiendo toquetear el filtrado, como veréis filtra por los campos que tiene sentido, es decir, no filtra por la id, timestatmps etc…' />
        </div>

        <div className='pb-12'>
          <H2 text='Instalar livewire' />
          <CopyBlock
            language='bash'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`composer require livewire/livewire`} />
        </div>

        <div className='pb-12'>
          <H2 text='Incluir en cada página' />
          <P>Debo incluir @liviewire... en cada página que utilice componentes de livewire</P>

          <CopyBlock
            language='html'
            theme={atomOneDark}
            codeBlock={true}
            showLineNumbers={false}
            wrapLongLines={true}
            text={`..
    @livewireStyles
</head>
<body>
    ...
                 
    @livewireScripts
</body>
</html>
            `} />
        </div>

        <div className='pb-12'>
          <H2 text='Componente' />
          <div className='pb-12'>
            <H3 text='Crear' />
            <CopyBlock
              language='bash'
              theme={atomOneDark}
              codeBlock={true}
              showLineNumbers={false}
              wrapLongLines={true}
              text={`php artisan make:livewire SearchUsers`} />
            <P>Se han generado 2 ficheros, la clase y la vista</P>

          </div>

          <div className='pb-12'>
            <H3 text='Implementar' />
            <P>En cada vista que vayamos a usar el componente</P>
            <CopyBlock
              language='html'
              theme={atomOneDark}
              codeBlock={true}
              showLineNumbers={false}
              wrapLongLines={true}
              text={`<livewire:search-users />`} />
          </div>

          <div className='pb-12'>
            <H3 text='Clase' />
            <P>Ubicada en app/Livewire</P>
            <DirectoryTreeView folder={pathLivewireComponentClass} />
            <CopyBlock
              language='php'
              theme={atomOneDark}
              codeBlock={true}
              showLineNumbers={false}
              wrapLongLines={true}
              text={`<?php

namespace App\\Livewire;

use App\\Models\\User;
use Livewire\\Component;

class SearchUsers extends Component
{
    public $search; // búsqueda del form

    public function render()
    {
        $users = [];

        if ($this->search) {
            $users = User::search($this->search)->get();
        } else {
            $users = User::all();
        }

        return view('livewire.search-users', compact('users')); // le paso users a la vista
    }
}`} />
          </div>

          <div className='pb-12'>
            <H3 text='Vista' />
            <P>Ubicada en resources/views/livewire</P>
            <DirectoryTreeView folder={pathLivewireComponentView} />
            <CopyBlock
              language='bash'
              theme={atomOneDark}
              codeBlock={true}
              showLineNumbers={false}
              wrapLongLines={true}
              text={`<div>
    <input type="text" wire:model.live="search" placeholder="Search users...">
    <ul>
        @foreach ($users as $user)
            <li>{{ $user->name }} | {{ $user->email }}</li>
        @endforeach
    </ul>
</div>`} />

          </div>
        </div>
        <P>a funcionar :)</P>
      </Article>
      <Footer />
    </>
  )
}

export default App
