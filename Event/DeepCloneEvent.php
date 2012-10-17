<?php

namespace Kunstmaan\AdminBundle\Event;

use Kunstmaan\AdminBundle\Entity\AbstractEntity;
use Doctrine\ORM\EntityManager;

/**
 * This event wil be used to pass metadata when the deep clone event is triggered.
 */
class DeepCloneEvent
{

    /**
     * @var mixed
     */
    private $entity;

    /**
     * @var mixed
     */
    private $clonedEntity;

    /**
     * @param mixed          $entity       The origin entity
     * @param mixed          $clonedEntity The cloned entity
     */
    public function __construct($entity, $clonedEntity)
    {
        $this->entity = $entity;
        $this->clonedEntity = $clonedEntity;
        $this->em = $em;
    }

    /**
     * @param mixed $clonedEntity
     */
    public function setClonedEntity($clonedEntity)
    {
        $this->clonedEntity = $clonedEntity;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getClonedEntity()
    {
        return $this->clonedEntity;
    }

    /**
     * @param mixed $entity
     */
    public function setEntity($entity)
    {
        $this->entity = $entity;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getEntity()
    {
        return $this->entity;
    }

}